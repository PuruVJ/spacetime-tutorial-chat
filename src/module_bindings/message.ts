// THIS FILE IS AUTOMATICALLY GENERATED BY SPACETIMEDB. EDITS TO THIS FILE
// WILL NOT BE SAVED. MODIFY TABLES IN RUST INSTEAD.

// @ts-ignore
import { __SPACETIMEDB__, AlgebraicType, ProductType, BuiltinType, ProductTypeElement, SumType, SumTypeVariant, DatabaseTable, AlgebraicValue, ReducerEvent, Identity, Address, ClientDB, SpacetimeDBClient } from "@clockworklabs/spacetimedb-sdk";

export class Message extends DatabaseTable
{
	public static db: ClientDB = __SPACETIMEDB__.clientDB;
	public static tableName = "Message";
	public id: number;
	public text: string;
	public timestamp: BigInt;
	public sender: Identity;

	public static primaryKey: string | undefined = "id";

	constructor(id: number, text: string, timestamp: BigInt, sender: Identity) {
	super();
		this.id = id;
		this.text = text;
		this.timestamp = timestamp;
		this.sender = sender;
	}

	public static serialize(value: Message): object {
		return [
		value.id, value.text, value.timestamp, Array.from(value.sender.toUint8Array())
		];
	}

	public static getAlgebraicType(): AlgebraicType
	{
		return AlgebraicType.createProductType([
			new ProductTypeElement("id", AlgebraicType.createPrimitiveType(BuiltinType.Type.I16)),
			new ProductTypeElement("text", AlgebraicType.createPrimitiveType(BuiltinType.Type.String)),
			new ProductTypeElement("timestamp", AlgebraicType.createPrimitiveType(BuiltinType.Type.U64)),
			new ProductTypeElement("sender", AlgebraicType.createProductType([
			new ProductTypeElement("__identity_bytes", AlgebraicType.createArrayType(AlgebraicType.createPrimitiveType(BuiltinType.Type.U8))),
		])),
		]);
	}

	public static fromValue(value: AlgebraicValue): Message
	{
		let productValue = value.asProductValue();
		let __id = productValue.elements[0].asNumber();
		let __text = productValue.elements[1].asString();
		let __timestamp = productValue.elements[2].asBigInt();
		let __sender = new Identity(productValue.elements[3].asProductValue().elements[0].asBytes());
		return new this(__id, __text, __timestamp, __sender);
	}

	public static filterById(value: number): Message | null
	{
		for(let instance of this.db.getTable("Message").getInstances())
		{
			if (instance.id === value) {
				return instance;
			}
		}
		return null;
	}

	public static filterByText(value: string): Message[]
	{
		let result: Message[] = [];
		for(let instance of this.db.getTable("Message").getInstances())
		{
			if (instance.text === value) {
				result.push(instance);
			}
		}
		return result;
	}

	public static filterByTimestamp(value: BigInt): Message[]
	{
		let result: Message[] = [];
		for(let instance of this.db.getTable("Message").getInstances())
		{
			if (instance.timestamp === value) {
				result.push(instance);
			}
		}
		return result;
	}

	public static filterBySender(value: Identity): Message[]
	{
		let result: Message[] = [];
		for(let instance of this.db.getTable("Message").getInstances())
		{
			if (instance.sender.isEqual(value)) {
				result.push(instance);
			}
		}
		return result;
	}


}

export default Message;
