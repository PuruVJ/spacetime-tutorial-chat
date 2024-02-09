// THIS FILE IS AUTOMATICALLY GENERATED BY SPACETIMEDB. EDITS TO THIS FILE
// WILL NOT BE SAVED. MODIFY TABLES IN RUST INSTEAD.

// @ts-ignore
import { __SPACETIMEDB__, AlgebraicType, ProductType, BuiltinType, ProductTypeElement, SumType, SumTypeVariant, DatabaseTable, AlgebraicValue, ReducerEvent, Identity, Address, ClientDB, SpacetimeDBClient } from "@clockworklabs/spacetimedb-sdk";

export class User extends DatabaseTable
{
	public static db: ClientDB = __SPACETIMEDB__.clientDB;
	public static tableName = "User";
	public id: Identity;
	public name: string | null;
	public online: boolean;

	public static primaryKey: string | undefined = "id";

	constructor(id: Identity, name: string | null, online: boolean) {
	super();
		this.id = id;
		this.name = name;
		this.online = online;
	}

	public static serialize(value: User): object {
		return [
		Array.from(value.id.toUint8Array()), value.name ? { "some": value.name } : { "none": [] }, value.online
		];
	}

	public static getAlgebraicType(): AlgebraicType
	{
		return AlgebraicType.createProductType([
			new ProductTypeElement("id", AlgebraicType.createProductType([
			new ProductTypeElement("__identity_bytes", AlgebraicType.createArrayType(AlgebraicType.createPrimitiveType(BuiltinType.Type.U8))),
		])),
			new ProductTypeElement("name", AlgebraicType.createSumType([
			new SumTypeVariant("some", AlgebraicType.createPrimitiveType(BuiltinType.Type.String)),
			new SumTypeVariant("none", AlgebraicType.createProductType([
		])),
		])),
			new ProductTypeElement("online", AlgebraicType.createPrimitiveType(BuiltinType.Type.Bool)),
		]);
	}

	public static fromValue(value: AlgebraicValue): User
	{
		let productValue = value.asProductValue();
		let __id = new Identity(productValue.elements[0].asProductValue().elements[0].asBytes());
		let __name = productValue.elements[1].asSumValue().tag == 1 ? null : productValue.elements[1].asSumValue().value.asString();
		let __online = productValue.elements[2].asBoolean();
		return new this(__id, __name, __online);
	}

	public static filterById(value: Identity): User | null
	{
		for(let instance of this.db.getTable("User").getInstances())
		{
			if (instance.id.isEqual(value)) {
				return instance;
			}
		}
		return null;
	}

	public static filterByOnline(value: boolean): User[]
	{
		let result: User[] = [];
		for(let instance of this.db.getTable("User").getInstances())
		{
			if (instance.online === value) {
				result.push(instance);
			}
		}
		return result;
	}


}

export default User;