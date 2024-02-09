use anyhow::{anyhow, Result};
use spacetimedb::{spacetimedb, Identity, ReducerContext, Timestamp};

#[spacetimedb(table)]
pub struct Message {
  #[primarykey]
  #[autoinc]
  id: i16,
  text: String,
  timestamp: Timestamp,
  sender: Identity,
}

#[spacetimedb(table)]
pub struct User {
  #[primarykey]
  id: Identity,
  name: Option<String>,
  online: bool,
}

#[spacetimedb(init)]
pub fn identity_connected(ctx: ReducerContext) {
  // Called everytime a new client connects
  if let Some(user) = User::filter_by_id(&ctx.sender) {
    // If this is a returning user, i.e. we already have a `User` with this `Identity`,
    // set `online: true`, but leave `name` and `identity` unchanged.
    User::update_by_id(
      &ctx.sender,
      User {
        online: true,
        ..user
      },
    );
  } else {
    // If this is a new user, create a `User` row for the `Identity`,
    // which is online, but hasn't set a name.
    match User::insert(User {
      name: None,
      id: ctx.sender,
      online: true,
    }) {
      Ok(_) => log::info!("New user created and connected!"),
      Err(e) => log::error!("Error creating new user: {}", e),
    }
  }
}

#[spacetimedb(disconnect)]
pub fn identity_disconnected(ctx: ReducerContext) {
  if let Some(user) = User::filter_by_id(&ctx.sender) {
    User::update_by_id(
      &ctx.sender,
      User {
        online: false,
        ..user
      },
    );
  } else {
    // This branch should be unreachable,
    // as it doesn't make sense for a client to disconnect without connecting first.
    log::warn!(
      "Disconnect event for unknown user with identity {:?}",
      ctx.sender
    );
  }
}

#[spacetimedb(reducer)]
pub fn set_name(ctx: ReducerContext, name: String) -> Result<()> {
  let name = validate_name(name);

  if let Some(user) = User::filter_by_id(&ctx.sender) {
    User::update_by_id(
      &ctx.sender,
      User {
        name: Some(name?),
        ..user
      },
    );
    Ok(())
  } else {
    Err(anyhow!("Cannot set name for unknown user"))
  }
}

#[spacetimedb(reducer)]
pub fn send_message(ctx: ReducerContext, text: String) {
  let message = validate_message(&text).unwrap();

  match Message::insert(Message {
    id: 0,
    text: message,
    timestamp: ctx.timestamp,
    sender: ctx.sender,
  }) {
    Ok(_) => log::info!("Message sent!"),
    Err(e) => log::error!("Error sending message: {}", e),
  }
}

fn validate_name(name: String) -> Result<String> {
  if name.is_empty() {
    Err(anyhow!("Names must not be empty"))
  } else {
    Ok(name)
  }
}

fn validate_message(text: &String) -> Result<String> {
  if text.is_empty() {
    Err(anyhow!("Messages must not be empty"))
  } else {
    Ok(text.to_string())
  }
}
