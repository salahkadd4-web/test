
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model VendeurProfile
 * 
 */
export type VendeurProfile = $Result.DefaultSelection<Prisma.$VendeurProfilePayload>
/**
 * Model VendeurDocument
 * 
 */
export type VendeurDocument = $Result.DefaultSelection<Prisma.$VendeurDocumentPayload>
/**
 * Model Category
 * 
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>
/**
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model ProductVariant
 * 
 */
export type ProductVariant = $Result.DefaultSelection<Prisma.$ProductVariantPayload>
/**
 * Model Cart
 * 
 */
export type Cart = $Result.DefaultSelection<Prisma.$CartPayload>
/**
 * Model CartItem
 * 
 */
export type CartItem = $Result.DefaultSelection<Prisma.$CartItemPayload>
/**
 * Model Favorite
 * 
 */
export type Favorite = $Result.DefaultSelection<Prisma.$FavoritePayload>
/**
 * Model Order
 * 
 */
export type Order = $Result.DefaultSelection<Prisma.$OrderPayload>
/**
 * Model OrderItem
 * 
 */
export type OrderItem = $Result.DefaultSelection<Prisma.$OrderItemPayload>
/**
 * Model ResetToken
 * 
 */
export type ResetToken = $Result.DefaultSelection<Prisma.$ResetTokenPayload>
/**
 * Model OtpToken
 * 
 */
export type OtpToken = $Result.DefaultSelection<Prisma.$OtpTokenPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  CLIENT: 'CLIENT',
  ADMIN: 'ADMIN',
  VENDEUR: 'VENDEUR'
};

export type Role = (typeof Role)[keyof typeof Role]


export const Genre: {
  HOMME: 'HOMME',
  FEMME: 'FEMME'
};

export type Genre = (typeof Genre)[keyof typeof Genre]


export const OrderStatus: {
  EN_ATTENTE: 'EN_ATTENTE',
  CONFIRMEE: 'CONFIRMEE',
  EN_PREPARATION: 'EN_PREPARATION',
  EXPEDIEE: 'EXPEDIEE',
  LIVREE: 'LIVREE',
  ANNULEE: 'ANNULEE'
};

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus]


export const VendeurStatut: {
  EN_ATTENTE: 'EN_ATTENTE',
  APPROUVE: 'APPROUVE',
  SUSPENDU: 'SUSPENDU',
  PIECES_REQUISES: 'PIECES_REQUISES'
};

export type VendeurStatut = (typeof VendeurStatut)[keyof typeof VendeurStatut]


export const DocumentStatut: {
  EN_ATTENTE: 'EN_ATTENTE',
  ACCEPTE: 'ACCEPTE',
  REFUSE: 'REFUSE'
};

export type DocumentStatut = (typeof DocumentStatut)[keyof typeof DocumentStatut]


export const CategoryStatut: {
  EN_ATTENTE: 'EN_ATTENTE',
  APPROUVEE: 'APPROUVEE',
  REFUSEE: 'REFUSEE'
};

export type CategoryStatut = (typeof CategoryStatut)[keyof typeof CategoryStatut]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type Genre = $Enums.Genre

export const Genre: typeof $Enums.Genre

export type OrderStatus = $Enums.OrderStatus

export const OrderStatus: typeof $Enums.OrderStatus

export type VendeurStatut = $Enums.VendeurStatut

export const VendeurStatut: typeof $Enums.VendeurStatut

export type DocumentStatut = $Enums.DocumentStatut

export const DocumentStatut: typeof $Enums.DocumentStatut

export type CategoryStatut = $Enums.CategoryStatut

export const CategoryStatut: typeof $Enums.CategoryStatut

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vendeurProfile`: Exposes CRUD operations for the **VendeurProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VendeurProfiles
    * const vendeurProfiles = await prisma.vendeurProfile.findMany()
    * ```
    */
  get vendeurProfile(): Prisma.VendeurProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vendeurDocument`: Exposes CRUD operations for the **VendeurDocument** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VendeurDocuments
    * const vendeurDocuments = await prisma.vendeurDocument.findMany()
    * ```
    */
  get vendeurDocument(): Prisma.VendeurDocumentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.productVariant`: Exposes CRUD operations for the **ProductVariant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductVariants
    * const productVariants = await prisma.productVariant.findMany()
    * ```
    */
  get productVariant(): Prisma.ProductVariantDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cart`: Exposes CRUD operations for the **Cart** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Carts
    * const carts = await prisma.cart.findMany()
    * ```
    */
  get cart(): Prisma.CartDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cartItem`: Exposes CRUD operations for the **CartItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CartItems
    * const cartItems = await prisma.cartItem.findMany()
    * ```
    */
  get cartItem(): Prisma.CartItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.favorite`: Exposes CRUD operations for the **Favorite** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Favorites
    * const favorites = await prisma.favorite.findMany()
    * ```
    */
  get favorite(): Prisma.FavoriteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.order`: Exposes CRUD operations for the **Order** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Orders
    * const orders = await prisma.order.findMany()
    * ```
    */
  get order(): Prisma.OrderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.orderItem`: Exposes CRUD operations for the **OrderItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrderItems
    * const orderItems = await prisma.orderItem.findMany()
    * ```
    */
  get orderItem(): Prisma.OrderItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.resetToken`: Exposes CRUD operations for the **ResetToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ResetTokens
    * const resetTokens = await prisma.resetToken.findMany()
    * ```
    */
  get resetToken(): Prisma.ResetTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.otpToken`: Exposes CRUD operations for the **OtpToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OtpTokens
    * const otpTokens = await prisma.otpToken.findMany()
    * ```
    */
  get otpToken(): Prisma.OtpTokenDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.5.0
   * Query Engine version: 280c870be64f457428992c43c1f6d557fab6e29e
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    VendeurProfile: 'VendeurProfile',
    VendeurDocument: 'VendeurDocument',
    Category: 'Category',
    Product: 'Product',
    ProductVariant: 'ProductVariant',
    Cart: 'Cart',
    CartItem: 'CartItem',
    Favorite: 'Favorite',
    Order: 'Order',
    OrderItem: 'OrderItem',
    ResetToken: 'ResetToken',
    OtpToken: 'OtpToken'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "vendeurProfile" | "vendeurDocument" | "category" | "product" | "productVariant" | "cart" | "cartItem" | "favorite" | "order" | "orderItem" | "resetToken" | "otpToken"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      VendeurProfile: {
        payload: Prisma.$VendeurProfilePayload<ExtArgs>
        fields: Prisma.VendeurProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VendeurProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendeurProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VendeurProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendeurProfilePayload>
          }
          findFirst: {
            args: Prisma.VendeurProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendeurProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VendeurProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendeurProfilePayload>
          }
          findMany: {
            args: Prisma.VendeurProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendeurProfilePayload>[]
          }
          create: {
            args: Prisma.VendeurProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendeurProfilePayload>
          }
          createMany: {
            args: Prisma.VendeurProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VendeurProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendeurProfilePayload>[]
          }
          delete: {
            args: Prisma.VendeurProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendeurProfilePayload>
          }
          update: {
            args: Prisma.VendeurProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendeurProfilePayload>
          }
          deleteMany: {
            args: Prisma.VendeurProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VendeurProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VendeurProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendeurProfilePayload>[]
          }
          upsert: {
            args: Prisma.VendeurProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendeurProfilePayload>
          }
          aggregate: {
            args: Prisma.VendeurProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVendeurProfile>
          }
          groupBy: {
            args: Prisma.VendeurProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<VendeurProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.VendeurProfileCountArgs<ExtArgs>
            result: $Utils.Optional<VendeurProfileCountAggregateOutputType> | number
          }
        }
      }
      VendeurDocument: {
        payload: Prisma.$VendeurDocumentPayload<ExtArgs>
        fields: Prisma.VendeurDocumentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VendeurDocumentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendeurDocumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VendeurDocumentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendeurDocumentPayload>
          }
          findFirst: {
            args: Prisma.VendeurDocumentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendeurDocumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VendeurDocumentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendeurDocumentPayload>
          }
          findMany: {
            args: Prisma.VendeurDocumentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendeurDocumentPayload>[]
          }
          create: {
            args: Prisma.VendeurDocumentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendeurDocumentPayload>
          }
          createMany: {
            args: Prisma.VendeurDocumentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VendeurDocumentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendeurDocumentPayload>[]
          }
          delete: {
            args: Prisma.VendeurDocumentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendeurDocumentPayload>
          }
          update: {
            args: Prisma.VendeurDocumentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendeurDocumentPayload>
          }
          deleteMany: {
            args: Prisma.VendeurDocumentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VendeurDocumentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VendeurDocumentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendeurDocumentPayload>[]
          }
          upsert: {
            args: Prisma.VendeurDocumentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendeurDocumentPayload>
          }
          aggregate: {
            args: Prisma.VendeurDocumentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVendeurDocument>
          }
          groupBy: {
            args: Prisma.VendeurDocumentGroupByArgs<ExtArgs>
            result: $Utils.Optional<VendeurDocumentGroupByOutputType>[]
          }
          count: {
            args: Prisma.VendeurDocumentCountArgs<ExtArgs>
            result: $Utils.Optional<VendeurDocumentCountAggregateOutputType> | number
          }
        }
      }
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>
        fields: Prisma.CategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      ProductVariant: {
        payload: Prisma.$ProductVariantPayload<ExtArgs>
        fields: Prisma.ProductVariantFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductVariantFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductVariantFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>
          }
          findFirst: {
            args: Prisma.ProductVariantFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductVariantFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>
          }
          findMany: {
            args: Prisma.ProductVariantFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>[]
          }
          create: {
            args: Prisma.ProductVariantCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>
          }
          createMany: {
            args: Prisma.ProductVariantCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductVariantCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>[]
          }
          delete: {
            args: Prisma.ProductVariantDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>
          }
          update: {
            args: Prisma.ProductVariantUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>
          }
          deleteMany: {
            args: Prisma.ProductVariantDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductVariantUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductVariantUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>[]
          }
          upsert: {
            args: Prisma.ProductVariantUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>
          }
          aggregate: {
            args: Prisma.ProductVariantAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductVariant>
          }
          groupBy: {
            args: Prisma.ProductVariantGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductVariantGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductVariantCountArgs<ExtArgs>
            result: $Utils.Optional<ProductVariantCountAggregateOutputType> | number
          }
        }
      }
      Cart: {
        payload: Prisma.$CartPayload<ExtArgs>
        fields: Prisma.CartFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CartFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CartFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload>
          }
          findFirst: {
            args: Prisma.CartFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CartFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload>
          }
          findMany: {
            args: Prisma.CartFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload>[]
          }
          create: {
            args: Prisma.CartCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload>
          }
          createMany: {
            args: Prisma.CartCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CartCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload>[]
          }
          delete: {
            args: Prisma.CartDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload>
          }
          update: {
            args: Prisma.CartUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload>
          }
          deleteMany: {
            args: Prisma.CartDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CartUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CartUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload>[]
          }
          upsert: {
            args: Prisma.CartUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload>
          }
          aggregate: {
            args: Prisma.CartAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCart>
          }
          groupBy: {
            args: Prisma.CartGroupByArgs<ExtArgs>
            result: $Utils.Optional<CartGroupByOutputType>[]
          }
          count: {
            args: Prisma.CartCountArgs<ExtArgs>
            result: $Utils.Optional<CartCountAggregateOutputType> | number
          }
        }
      }
      CartItem: {
        payload: Prisma.$CartItemPayload<ExtArgs>
        fields: Prisma.CartItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CartItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CartItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartItemPayload>
          }
          findFirst: {
            args: Prisma.CartItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CartItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartItemPayload>
          }
          findMany: {
            args: Prisma.CartItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartItemPayload>[]
          }
          create: {
            args: Prisma.CartItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartItemPayload>
          }
          createMany: {
            args: Prisma.CartItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CartItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartItemPayload>[]
          }
          delete: {
            args: Prisma.CartItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartItemPayload>
          }
          update: {
            args: Prisma.CartItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartItemPayload>
          }
          deleteMany: {
            args: Prisma.CartItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CartItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CartItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartItemPayload>[]
          }
          upsert: {
            args: Prisma.CartItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartItemPayload>
          }
          aggregate: {
            args: Prisma.CartItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCartItem>
          }
          groupBy: {
            args: Prisma.CartItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<CartItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.CartItemCountArgs<ExtArgs>
            result: $Utils.Optional<CartItemCountAggregateOutputType> | number
          }
        }
      }
      Favorite: {
        payload: Prisma.$FavoritePayload<ExtArgs>
        fields: Prisma.FavoriteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FavoriteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FavoriteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>
          }
          findFirst: {
            args: Prisma.FavoriteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FavoriteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>
          }
          findMany: {
            args: Prisma.FavoriteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>[]
          }
          create: {
            args: Prisma.FavoriteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>
          }
          createMany: {
            args: Prisma.FavoriteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FavoriteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>[]
          }
          delete: {
            args: Prisma.FavoriteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>
          }
          update: {
            args: Prisma.FavoriteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>
          }
          deleteMany: {
            args: Prisma.FavoriteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FavoriteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FavoriteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>[]
          }
          upsert: {
            args: Prisma.FavoriteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>
          }
          aggregate: {
            args: Prisma.FavoriteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFavorite>
          }
          groupBy: {
            args: Prisma.FavoriteGroupByArgs<ExtArgs>
            result: $Utils.Optional<FavoriteGroupByOutputType>[]
          }
          count: {
            args: Prisma.FavoriteCountArgs<ExtArgs>
            result: $Utils.Optional<FavoriteCountAggregateOutputType> | number
          }
        }
      }
      Order: {
        payload: Prisma.$OrderPayload<ExtArgs>
        fields: Prisma.OrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findFirst: {
            args: Prisma.OrderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findMany: {
            args: Prisma.OrderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          create: {
            args: Prisma.OrderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          createMany: {
            args: Prisma.OrderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          delete: {
            args: Prisma.OrderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          update: {
            args: Prisma.OrderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          deleteMany: {
            args: Prisma.OrderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          upsert: {
            args: Prisma.OrderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          aggregate: {
            args: Prisma.OrderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrder>
          }
          groupBy: {
            args: Prisma.OrderGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderCountArgs<ExtArgs>
            result: $Utils.Optional<OrderCountAggregateOutputType> | number
          }
        }
      }
      OrderItem: {
        payload: Prisma.$OrderItemPayload<ExtArgs>
        fields: Prisma.OrderItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          findFirst: {
            args: Prisma.OrderItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          findMany: {
            args: Prisma.OrderItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[]
          }
          create: {
            args: Prisma.OrderItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          createMany: {
            args: Prisma.OrderItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[]
          }
          delete: {
            args: Prisma.OrderItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          update: {
            args: Prisma.OrderItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          deleteMany: {
            args: Prisma.OrderItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrderItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[]
          }
          upsert: {
            args: Prisma.OrderItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          aggregate: {
            args: Prisma.OrderItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrderItem>
          }
          groupBy: {
            args: Prisma.OrderItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderItemCountArgs<ExtArgs>
            result: $Utils.Optional<OrderItemCountAggregateOutputType> | number
          }
        }
      }
      ResetToken: {
        payload: Prisma.$ResetTokenPayload<ExtArgs>
        fields: Prisma.ResetTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ResetTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResetTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ResetTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResetTokenPayload>
          }
          findFirst: {
            args: Prisma.ResetTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResetTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ResetTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResetTokenPayload>
          }
          findMany: {
            args: Prisma.ResetTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResetTokenPayload>[]
          }
          create: {
            args: Prisma.ResetTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResetTokenPayload>
          }
          createMany: {
            args: Prisma.ResetTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ResetTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResetTokenPayload>[]
          }
          delete: {
            args: Prisma.ResetTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResetTokenPayload>
          }
          update: {
            args: Prisma.ResetTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResetTokenPayload>
          }
          deleteMany: {
            args: Prisma.ResetTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ResetTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ResetTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResetTokenPayload>[]
          }
          upsert: {
            args: Prisma.ResetTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResetTokenPayload>
          }
          aggregate: {
            args: Prisma.ResetTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateResetToken>
          }
          groupBy: {
            args: Prisma.ResetTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<ResetTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.ResetTokenCountArgs<ExtArgs>
            result: $Utils.Optional<ResetTokenCountAggregateOutputType> | number
          }
        }
      }
      OtpToken: {
        payload: Prisma.$OtpTokenPayload<ExtArgs>
        fields: Prisma.OtpTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OtpTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OtpTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpTokenPayload>
          }
          findFirst: {
            args: Prisma.OtpTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OtpTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpTokenPayload>
          }
          findMany: {
            args: Prisma.OtpTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpTokenPayload>[]
          }
          create: {
            args: Prisma.OtpTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpTokenPayload>
          }
          createMany: {
            args: Prisma.OtpTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OtpTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpTokenPayload>[]
          }
          delete: {
            args: Prisma.OtpTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpTokenPayload>
          }
          update: {
            args: Prisma.OtpTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpTokenPayload>
          }
          deleteMany: {
            args: Prisma.OtpTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OtpTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OtpTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpTokenPayload>[]
          }
          upsert: {
            args: Prisma.OtpTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpTokenPayload>
          }
          aggregate: {
            args: Prisma.OtpTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOtpToken>
          }
          groupBy: {
            args: Prisma.OtpTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<OtpTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.OtpTokenCountArgs<ExtArgs>
            result: $Utils.Optional<OtpTokenCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    vendeurProfile?: VendeurProfileOmit
    vendeurDocument?: VendeurDocumentOmit
    category?: CategoryOmit
    product?: ProductOmit
    productVariant?: ProductVariantOmit
    cart?: CartOmit
    cartItem?: CartItemOmit
    favorite?: FavoriteOmit
    order?: OrderOmit
    orderItem?: OrderItemOmit
    resetToken?: ResetTokenOmit
    otpToken?: OtpTokenOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    favorites: number
    orders: number
    resetTokens: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    favorites?: boolean | UserCountOutputTypeCountFavoritesArgs
    orders?: boolean | UserCountOutputTypeCountOrdersArgs
    resetTokens?: boolean | UserCountOutputTypeCountResetTokensArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFavoritesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FavoriteWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountResetTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResetTokenWhereInput
  }


  /**
   * Count Type VendeurProfileCountOutputType
   */

  export type VendeurProfileCountOutputType = {
    documents: number
    products: number
    categories: number
  }

  export type VendeurProfileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    documents?: boolean | VendeurProfileCountOutputTypeCountDocumentsArgs
    products?: boolean | VendeurProfileCountOutputTypeCountProductsArgs
    categories?: boolean | VendeurProfileCountOutputTypeCountCategoriesArgs
  }

  // Custom InputTypes
  /**
   * VendeurProfileCountOutputType without action
   */
  export type VendeurProfileCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendeurProfileCountOutputType
     */
    select?: VendeurProfileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VendeurProfileCountOutputType without action
   */
  export type VendeurProfileCountOutputTypeCountDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VendeurDocumentWhereInput
  }

  /**
   * VendeurProfileCountOutputType without action
   */
  export type VendeurProfileCountOutputTypeCountProductsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
  }

  /**
   * VendeurProfileCountOutputType without action
   */
  export type VendeurProfileCountOutputTypeCountCategoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
  }


  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    products: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | CategoryCountOutputTypeCountProductsArgs
  }

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountProductsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
  }


  /**
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    cartItems: number
    favorites: number
    orderItems: number
    variants: number
  }

  export type ProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cartItems?: boolean | ProductCountOutputTypeCountCartItemsArgs
    favorites?: boolean | ProductCountOutputTypeCountFavoritesArgs
    orderItems?: boolean | ProductCountOutputTypeCountOrderItemsArgs
    variants?: boolean | ProductCountOutputTypeCountVariantsArgs
  }

  // Custom InputTypes
  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountCartItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CartItemWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountFavoritesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FavoriteWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountOrderItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountVariantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductVariantWhereInput
  }


  /**
   * Count Type ProductVariantCountOutputType
   */

  export type ProductVariantCountOutputType = {
    cartItems: number
    orderItems: number
  }

  export type ProductVariantCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cartItems?: boolean | ProductVariantCountOutputTypeCountCartItemsArgs
    orderItems?: boolean | ProductVariantCountOutputTypeCountOrderItemsArgs
  }

  // Custom InputTypes
  /**
   * ProductVariantCountOutputType without action
   */
  export type ProductVariantCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariantCountOutputType
     */
    select?: ProductVariantCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductVariantCountOutputType without action
   */
  export type ProductVariantCountOutputTypeCountCartItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CartItemWhereInput
  }

  /**
   * ProductVariantCountOutputType without action
   */
  export type ProductVariantCountOutputTypeCountOrderItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
  }


  /**
   * Count Type CartCountOutputType
   */

  export type CartCountOutputType = {
    items: number
  }

  export type CartCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | CartCountOutputTypeCountItemsArgs
  }

  // Custom InputTypes
  /**
   * CartCountOutputType without action
   */
  export type CartCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartCountOutputType
     */
    select?: CartCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CartCountOutputType without action
   */
  export type CartCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CartItemWhereInput
  }


  /**
   * Count Type OrderCountOutputType
   */

  export type OrderCountOutputType = {
    items: number
  }

  export type OrderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | OrderCountOutputTypeCountItemsArgs
  }

  // Custom InputTypes
  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderCountOutputType
     */
    select?: OrderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    age: number | null
  }

  export type UserSumAggregateOutputType = {
    age: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    nom: string | null
    prenom: string | null
    email: string | null
    telephone: string | null
    motDePasse: string | null
    role: $Enums.Role | null
    avatar: string | null
    createdAt: Date | null
    updatedAt: Date | null
    age: number | null
    genre: $Enums.Genre | null
    wilaya: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    nom: string | null
    prenom: string | null
    email: string | null
    telephone: string | null
    motDePasse: string | null
    role: $Enums.Role | null
    avatar: string | null
    createdAt: Date | null
    updatedAt: Date | null
    age: number | null
    genre: $Enums.Genre | null
    wilaya: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    nom: number
    prenom: number
    email: number
    telephone: number
    motDePasse: number
    role: number
    avatar: number
    createdAt: number
    updatedAt: number
    age: number
    genre: number
    wilaya: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    age?: true
  }

  export type UserSumAggregateInputType = {
    age?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    nom?: true
    prenom?: true
    email?: true
    telephone?: true
    motDePasse?: true
    role?: true
    avatar?: true
    createdAt?: true
    updatedAt?: true
    age?: true
    genre?: true
    wilaya?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    nom?: true
    prenom?: true
    email?: true
    telephone?: true
    motDePasse?: true
    role?: true
    avatar?: true
    createdAt?: true
    updatedAt?: true
    age?: true
    genre?: true
    wilaya?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    nom?: true
    prenom?: true
    email?: true
    telephone?: true
    motDePasse?: true
    role?: true
    avatar?: true
    createdAt?: true
    updatedAt?: true
    age?: true
    genre?: true
    wilaya?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    nom: string
    prenom: string
    email: string | null
    telephone: string | null
    motDePasse: string | null
    role: $Enums.Role
    avatar: string | null
    createdAt: Date
    updatedAt: Date
    age: number | null
    genre: $Enums.Genre | null
    wilaya: string | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    prenom?: boolean
    email?: boolean
    telephone?: boolean
    motDePasse?: boolean
    role?: boolean
    avatar?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    age?: boolean
    genre?: boolean
    wilaya?: boolean
    cart?: boolean | User$cartArgs<ExtArgs>
    favorites?: boolean | User$favoritesArgs<ExtArgs>
    orders?: boolean | User$ordersArgs<ExtArgs>
    resetTokens?: boolean | User$resetTokensArgs<ExtArgs>
    vendeurProfile?: boolean | User$vendeurProfileArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    prenom?: boolean
    email?: boolean
    telephone?: boolean
    motDePasse?: boolean
    role?: boolean
    avatar?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    age?: boolean
    genre?: boolean
    wilaya?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    prenom?: boolean
    email?: boolean
    telephone?: boolean
    motDePasse?: boolean
    role?: boolean
    avatar?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    age?: boolean
    genre?: boolean
    wilaya?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    nom?: boolean
    prenom?: boolean
    email?: boolean
    telephone?: boolean
    motDePasse?: boolean
    role?: boolean
    avatar?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    age?: boolean
    genre?: boolean
    wilaya?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nom" | "prenom" | "email" | "telephone" | "motDePasse" | "role" | "avatar" | "createdAt" | "updatedAt" | "age" | "genre" | "wilaya", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cart?: boolean | User$cartArgs<ExtArgs>
    favorites?: boolean | User$favoritesArgs<ExtArgs>
    orders?: boolean | User$ordersArgs<ExtArgs>
    resetTokens?: boolean | User$resetTokensArgs<ExtArgs>
    vendeurProfile?: boolean | User$vendeurProfileArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      cart: Prisma.$CartPayload<ExtArgs> | null
      favorites: Prisma.$FavoritePayload<ExtArgs>[]
      orders: Prisma.$OrderPayload<ExtArgs>[]
      resetTokens: Prisma.$ResetTokenPayload<ExtArgs>[]
      vendeurProfile: Prisma.$VendeurProfilePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nom: string
      prenom: string
      email: string | null
      telephone: string | null
      motDePasse: string | null
      role: $Enums.Role
      avatar: string | null
      createdAt: Date
      updatedAt: Date
      age: number | null
      genre: $Enums.Genre | null
      wilaya: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cart<T extends User$cartArgs<ExtArgs> = {}>(args?: Subset<T, User$cartArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    favorites<T extends User$favoritesArgs<ExtArgs> = {}>(args?: Subset<T, User$favoritesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    orders<T extends User$ordersArgs<ExtArgs> = {}>(args?: Subset<T, User$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    resetTokens<T extends User$resetTokensArgs<ExtArgs> = {}>(args?: Subset<T, User$resetTokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResetTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    vendeurProfile<T extends User$vendeurProfileArgs<ExtArgs> = {}>(args?: Subset<T, User$vendeurProfileArgs<ExtArgs>>): Prisma__VendeurProfileClient<$Result.GetResult<Prisma.$VendeurProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly nom: FieldRef<"User", 'String'>
    readonly prenom: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly telephone: FieldRef<"User", 'String'>
    readonly motDePasse: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly avatar: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly age: FieldRef<"User", 'Int'>
    readonly genre: FieldRef<"User", 'Genre'>
    readonly wilaya: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.cart
   */
  export type User$cartArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cart
     */
    omit?: CartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    where?: CartWhereInput
  }

  /**
   * User.favorites
   */
  export type User$favoritesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    where?: FavoriteWhereInput
    orderBy?: FavoriteOrderByWithRelationInput | FavoriteOrderByWithRelationInput[]
    cursor?: FavoriteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FavoriteScalarFieldEnum | FavoriteScalarFieldEnum[]
  }

  /**
   * User.orders
   */
  export type User$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * User.resetTokens
   */
  export type User$resetTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResetToken
     */
    select?: ResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResetToken
     */
    omit?: ResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResetTokenInclude<ExtArgs> | null
    where?: ResetTokenWhereInput
    orderBy?: ResetTokenOrderByWithRelationInput | ResetTokenOrderByWithRelationInput[]
    cursor?: ResetTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ResetTokenScalarFieldEnum | ResetTokenScalarFieldEnum[]
  }

  /**
   * User.vendeurProfile
   */
  export type User$vendeurProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendeurProfile
     */
    select?: VendeurProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendeurProfile
     */
    omit?: VendeurProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendeurProfileInclude<ExtArgs> | null
    where?: VendeurProfileWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model VendeurProfile
   */

  export type AggregateVendeurProfile = {
    _count: VendeurProfileCountAggregateOutputType | null
    _min: VendeurProfileMinAggregateOutputType | null
    _max: VendeurProfileMaxAggregateOutputType | null
  }

  export type VendeurProfileMinAggregateOutputType = {
    id: string | null
    userId: string | null
    statut: $Enums.VendeurStatut | null
    nomBoutique: string | null
    description: string | null
    adminNote: string | null
    createdAt: Date | null
    updatedAt: Date | null
    flowmerceApiKey: string | null
  }

  export type VendeurProfileMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    statut: $Enums.VendeurStatut | null
    nomBoutique: string | null
    description: string | null
    adminNote: string | null
    createdAt: Date | null
    updatedAt: Date | null
    flowmerceApiKey: string | null
  }

  export type VendeurProfileCountAggregateOutputType = {
    id: number
    userId: number
    statut: number
    nomBoutique: number
    description: number
    adminNote: number
    createdAt: number
    updatedAt: number
    flowmerceApiKey: number
    _all: number
  }


  export type VendeurProfileMinAggregateInputType = {
    id?: true
    userId?: true
    statut?: true
    nomBoutique?: true
    description?: true
    adminNote?: true
    createdAt?: true
    updatedAt?: true
    flowmerceApiKey?: true
  }

  export type VendeurProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    statut?: true
    nomBoutique?: true
    description?: true
    adminNote?: true
    createdAt?: true
    updatedAt?: true
    flowmerceApiKey?: true
  }

  export type VendeurProfileCountAggregateInputType = {
    id?: true
    userId?: true
    statut?: true
    nomBoutique?: true
    description?: true
    adminNote?: true
    createdAt?: true
    updatedAt?: true
    flowmerceApiKey?: true
    _all?: true
  }

  export type VendeurProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VendeurProfile to aggregate.
     */
    where?: VendeurProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VendeurProfiles to fetch.
     */
    orderBy?: VendeurProfileOrderByWithRelationInput | VendeurProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VendeurProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VendeurProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VendeurProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VendeurProfiles
    **/
    _count?: true | VendeurProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VendeurProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VendeurProfileMaxAggregateInputType
  }

  export type GetVendeurProfileAggregateType<T extends VendeurProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateVendeurProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVendeurProfile[P]>
      : GetScalarType<T[P], AggregateVendeurProfile[P]>
  }




  export type VendeurProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VendeurProfileWhereInput
    orderBy?: VendeurProfileOrderByWithAggregationInput | VendeurProfileOrderByWithAggregationInput[]
    by: VendeurProfileScalarFieldEnum[] | VendeurProfileScalarFieldEnum
    having?: VendeurProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VendeurProfileCountAggregateInputType | true
    _min?: VendeurProfileMinAggregateInputType
    _max?: VendeurProfileMaxAggregateInputType
  }

  export type VendeurProfileGroupByOutputType = {
    id: string
    userId: string
    statut: $Enums.VendeurStatut
    nomBoutique: string | null
    description: string | null
    adminNote: string | null
    createdAt: Date
    updatedAt: Date
    flowmerceApiKey: string | null
    _count: VendeurProfileCountAggregateOutputType | null
    _min: VendeurProfileMinAggregateOutputType | null
    _max: VendeurProfileMaxAggregateOutputType | null
  }

  type GetVendeurProfileGroupByPayload<T extends VendeurProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VendeurProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VendeurProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VendeurProfileGroupByOutputType[P]>
            : GetScalarType<T[P], VendeurProfileGroupByOutputType[P]>
        }
      >
    >


  export type VendeurProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    statut?: boolean
    nomBoutique?: boolean
    description?: boolean
    adminNote?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    flowmerceApiKey?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    documents?: boolean | VendeurProfile$documentsArgs<ExtArgs>
    products?: boolean | VendeurProfile$productsArgs<ExtArgs>
    categories?: boolean | VendeurProfile$categoriesArgs<ExtArgs>
    _count?: boolean | VendeurProfileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vendeurProfile"]>

  export type VendeurProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    statut?: boolean
    nomBoutique?: boolean
    description?: boolean
    adminNote?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    flowmerceApiKey?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vendeurProfile"]>

  export type VendeurProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    statut?: boolean
    nomBoutique?: boolean
    description?: boolean
    adminNote?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    flowmerceApiKey?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vendeurProfile"]>

  export type VendeurProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    statut?: boolean
    nomBoutique?: boolean
    description?: boolean
    adminNote?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    flowmerceApiKey?: boolean
  }

  export type VendeurProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "statut" | "nomBoutique" | "description" | "adminNote" | "createdAt" | "updatedAt" | "flowmerceApiKey", ExtArgs["result"]["vendeurProfile"]>
  export type VendeurProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    documents?: boolean | VendeurProfile$documentsArgs<ExtArgs>
    products?: boolean | VendeurProfile$productsArgs<ExtArgs>
    categories?: boolean | VendeurProfile$categoriesArgs<ExtArgs>
    _count?: boolean | VendeurProfileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type VendeurProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type VendeurProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $VendeurProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VendeurProfile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      documents: Prisma.$VendeurDocumentPayload<ExtArgs>[]
      products: Prisma.$ProductPayload<ExtArgs>[]
      categories: Prisma.$CategoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      statut: $Enums.VendeurStatut
      nomBoutique: string | null
      description: string | null
      adminNote: string | null
      createdAt: Date
      updatedAt: Date
      flowmerceApiKey: string | null
    }, ExtArgs["result"]["vendeurProfile"]>
    composites: {}
  }

  type VendeurProfileGetPayload<S extends boolean | null | undefined | VendeurProfileDefaultArgs> = $Result.GetResult<Prisma.$VendeurProfilePayload, S>

  type VendeurProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VendeurProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VendeurProfileCountAggregateInputType | true
    }

  export interface VendeurProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VendeurProfile'], meta: { name: 'VendeurProfile' } }
    /**
     * Find zero or one VendeurProfile that matches the filter.
     * @param {VendeurProfileFindUniqueArgs} args - Arguments to find a VendeurProfile
     * @example
     * // Get one VendeurProfile
     * const vendeurProfile = await prisma.vendeurProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VendeurProfileFindUniqueArgs>(args: SelectSubset<T, VendeurProfileFindUniqueArgs<ExtArgs>>): Prisma__VendeurProfileClient<$Result.GetResult<Prisma.$VendeurProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VendeurProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VendeurProfileFindUniqueOrThrowArgs} args - Arguments to find a VendeurProfile
     * @example
     * // Get one VendeurProfile
     * const vendeurProfile = await prisma.vendeurProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VendeurProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, VendeurProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VendeurProfileClient<$Result.GetResult<Prisma.$VendeurProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VendeurProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendeurProfileFindFirstArgs} args - Arguments to find a VendeurProfile
     * @example
     * // Get one VendeurProfile
     * const vendeurProfile = await prisma.vendeurProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VendeurProfileFindFirstArgs>(args?: SelectSubset<T, VendeurProfileFindFirstArgs<ExtArgs>>): Prisma__VendeurProfileClient<$Result.GetResult<Prisma.$VendeurProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VendeurProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendeurProfileFindFirstOrThrowArgs} args - Arguments to find a VendeurProfile
     * @example
     * // Get one VendeurProfile
     * const vendeurProfile = await prisma.vendeurProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VendeurProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, VendeurProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__VendeurProfileClient<$Result.GetResult<Prisma.$VendeurProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VendeurProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendeurProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VendeurProfiles
     * const vendeurProfiles = await prisma.vendeurProfile.findMany()
     * 
     * // Get first 10 VendeurProfiles
     * const vendeurProfiles = await prisma.vendeurProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vendeurProfileWithIdOnly = await prisma.vendeurProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VendeurProfileFindManyArgs>(args?: SelectSubset<T, VendeurProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendeurProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VendeurProfile.
     * @param {VendeurProfileCreateArgs} args - Arguments to create a VendeurProfile.
     * @example
     * // Create one VendeurProfile
     * const VendeurProfile = await prisma.vendeurProfile.create({
     *   data: {
     *     // ... data to create a VendeurProfile
     *   }
     * })
     * 
     */
    create<T extends VendeurProfileCreateArgs>(args: SelectSubset<T, VendeurProfileCreateArgs<ExtArgs>>): Prisma__VendeurProfileClient<$Result.GetResult<Prisma.$VendeurProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VendeurProfiles.
     * @param {VendeurProfileCreateManyArgs} args - Arguments to create many VendeurProfiles.
     * @example
     * // Create many VendeurProfiles
     * const vendeurProfile = await prisma.vendeurProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VendeurProfileCreateManyArgs>(args?: SelectSubset<T, VendeurProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VendeurProfiles and returns the data saved in the database.
     * @param {VendeurProfileCreateManyAndReturnArgs} args - Arguments to create many VendeurProfiles.
     * @example
     * // Create many VendeurProfiles
     * const vendeurProfile = await prisma.vendeurProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VendeurProfiles and only return the `id`
     * const vendeurProfileWithIdOnly = await prisma.vendeurProfile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VendeurProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, VendeurProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendeurProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VendeurProfile.
     * @param {VendeurProfileDeleteArgs} args - Arguments to delete one VendeurProfile.
     * @example
     * // Delete one VendeurProfile
     * const VendeurProfile = await prisma.vendeurProfile.delete({
     *   where: {
     *     // ... filter to delete one VendeurProfile
     *   }
     * })
     * 
     */
    delete<T extends VendeurProfileDeleteArgs>(args: SelectSubset<T, VendeurProfileDeleteArgs<ExtArgs>>): Prisma__VendeurProfileClient<$Result.GetResult<Prisma.$VendeurProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VendeurProfile.
     * @param {VendeurProfileUpdateArgs} args - Arguments to update one VendeurProfile.
     * @example
     * // Update one VendeurProfile
     * const vendeurProfile = await prisma.vendeurProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VendeurProfileUpdateArgs>(args: SelectSubset<T, VendeurProfileUpdateArgs<ExtArgs>>): Prisma__VendeurProfileClient<$Result.GetResult<Prisma.$VendeurProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VendeurProfiles.
     * @param {VendeurProfileDeleteManyArgs} args - Arguments to filter VendeurProfiles to delete.
     * @example
     * // Delete a few VendeurProfiles
     * const { count } = await prisma.vendeurProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VendeurProfileDeleteManyArgs>(args?: SelectSubset<T, VendeurProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VendeurProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendeurProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VendeurProfiles
     * const vendeurProfile = await prisma.vendeurProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VendeurProfileUpdateManyArgs>(args: SelectSubset<T, VendeurProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VendeurProfiles and returns the data updated in the database.
     * @param {VendeurProfileUpdateManyAndReturnArgs} args - Arguments to update many VendeurProfiles.
     * @example
     * // Update many VendeurProfiles
     * const vendeurProfile = await prisma.vendeurProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VendeurProfiles and only return the `id`
     * const vendeurProfileWithIdOnly = await prisma.vendeurProfile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VendeurProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, VendeurProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendeurProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VendeurProfile.
     * @param {VendeurProfileUpsertArgs} args - Arguments to update or create a VendeurProfile.
     * @example
     * // Update or create a VendeurProfile
     * const vendeurProfile = await prisma.vendeurProfile.upsert({
     *   create: {
     *     // ... data to create a VendeurProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VendeurProfile we want to update
     *   }
     * })
     */
    upsert<T extends VendeurProfileUpsertArgs>(args: SelectSubset<T, VendeurProfileUpsertArgs<ExtArgs>>): Prisma__VendeurProfileClient<$Result.GetResult<Prisma.$VendeurProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VendeurProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendeurProfileCountArgs} args - Arguments to filter VendeurProfiles to count.
     * @example
     * // Count the number of VendeurProfiles
     * const count = await prisma.vendeurProfile.count({
     *   where: {
     *     // ... the filter for the VendeurProfiles we want to count
     *   }
     * })
    **/
    count<T extends VendeurProfileCountArgs>(
      args?: Subset<T, VendeurProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VendeurProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VendeurProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendeurProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VendeurProfileAggregateArgs>(args: Subset<T, VendeurProfileAggregateArgs>): Prisma.PrismaPromise<GetVendeurProfileAggregateType<T>>

    /**
     * Group by VendeurProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendeurProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VendeurProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VendeurProfileGroupByArgs['orderBy'] }
        : { orderBy?: VendeurProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VendeurProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVendeurProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VendeurProfile model
   */
  readonly fields: VendeurProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VendeurProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VendeurProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    documents<T extends VendeurProfile$documentsArgs<ExtArgs> = {}>(args?: Subset<T, VendeurProfile$documentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendeurDocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    products<T extends VendeurProfile$productsArgs<ExtArgs> = {}>(args?: Subset<T, VendeurProfile$productsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    categories<T extends VendeurProfile$categoriesArgs<ExtArgs> = {}>(args?: Subset<T, VendeurProfile$categoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VendeurProfile model
   */
  interface VendeurProfileFieldRefs {
    readonly id: FieldRef<"VendeurProfile", 'String'>
    readonly userId: FieldRef<"VendeurProfile", 'String'>
    readonly statut: FieldRef<"VendeurProfile", 'VendeurStatut'>
    readonly nomBoutique: FieldRef<"VendeurProfile", 'String'>
    readonly description: FieldRef<"VendeurProfile", 'String'>
    readonly adminNote: FieldRef<"VendeurProfile", 'String'>
    readonly createdAt: FieldRef<"VendeurProfile", 'DateTime'>
    readonly updatedAt: FieldRef<"VendeurProfile", 'DateTime'>
    readonly flowmerceApiKey: FieldRef<"VendeurProfile", 'String'>
  }
    

  // Custom InputTypes
  /**
   * VendeurProfile findUnique
   */
  export type VendeurProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendeurProfile
     */
    select?: VendeurProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendeurProfile
     */
    omit?: VendeurProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendeurProfileInclude<ExtArgs> | null
    /**
     * Filter, which VendeurProfile to fetch.
     */
    where: VendeurProfileWhereUniqueInput
  }

  /**
   * VendeurProfile findUniqueOrThrow
   */
  export type VendeurProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendeurProfile
     */
    select?: VendeurProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendeurProfile
     */
    omit?: VendeurProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendeurProfileInclude<ExtArgs> | null
    /**
     * Filter, which VendeurProfile to fetch.
     */
    where: VendeurProfileWhereUniqueInput
  }

  /**
   * VendeurProfile findFirst
   */
  export type VendeurProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendeurProfile
     */
    select?: VendeurProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendeurProfile
     */
    omit?: VendeurProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendeurProfileInclude<ExtArgs> | null
    /**
     * Filter, which VendeurProfile to fetch.
     */
    where?: VendeurProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VendeurProfiles to fetch.
     */
    orderBy?: VendeurProfileOrderByWithRelationInput | VendeurProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VendeurProfiles.
     */
    cursor?: VendeurProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VendeurProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VendeurProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VendeurProfiles.
     */
    distinct?: VendeurProfileScalarFieldEnum | VendeurProfileScalarFieldEnum[]
  }

  /**
   * VendeurProfile findFirstOrThrow
   */
  export type VendeurProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendeurProfile
     */
    select?: VendeurProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendeurProfile
     */
    omit?: VendeurProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendeurProfileInclude<ExtArgs> | null
    /**
     * Filter, which VendeurProfile to fetch.
     */
    where?: VendeurProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VendeurProfiles to fetch.
     */
    orderBy?: VendeurProfileOrderByWithRelationInput | VendeurProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VendeurProfiles.
     */
    cursor?: VendeurProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VendeurProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VendeurProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VendeurProfiles.
     */
    distinct?: VendeurProfileScalarFieldEnum | VendeurProfileScalarFieldEnum[]
  }

  /**
   * VendeurProfile findMany
   */
  export type VendeurProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendeurProfile
     */
    select?: VendeurProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendeurProfile
     */
    omit?: VendeurProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendeurProfileInclude<ExtArgs> | null
    /**
     * Filter, which VendeurProfiles to fetch.
     */
    where?: VendeurProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VendeurProfiles to fetch.
     */
    orderBy?: VendeurProfileOrderByWithRelationInput | VendeurProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VendeurProfiles.
     */
    cursor?: VendeurProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VendeurProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VendeurProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VendeurProfiles.
     */
    distinct?: VendeurProfileScalarFieldEnum | VendeurProfileScalarFieldEnum[]
  }

  /**
   * VendeurProfile create
   */
  export type VendeurProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendeurProfile
     */
    select?: VendeurProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendeurProfile
     */
    omit?: VendeurProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendeurProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a VendeurProfile.
     */
    data: XOR<VendeurProfileCreateInput, VendeurProfileUncheckedCreateInput>
  }

  /**
   * VendeurProfile createMany
   */
  export type VendeurProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VendeurProfiles.
     */
    data: VendeurProfileCreateManyInput | VendeurProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VendeurProfile createManyAndReturn
   */
  export type VendeurProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendeurProfile
     */
    select?: VendeurProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VendeurProfile
     */
    omit?: VendeurProfileOmit<ExtArgs> | null
    /**
     * The data used to create many VendeurProfiles.
     */
    data: VendeurProfileCreateManyInput | VendeurProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendeurProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * VendeurProfile update
   */
  export type VendeurProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendeurProfile
     */
    select?: VendeurProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendeurProfile
     */
    omit?: VendeurProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendeurProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a VendeurProfile.
     */
    data: XOR<VendeurProfileUpdateInput, VendeurProfileUncheckedUpdateInput>
    /**
     * Choose, which VendeurProfile to update.
     */
    where: VendeurProfileWhereUniqueInput
  }

  /**
   * VendeurProfile updateMany
   */
  export type VendeurProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VendeurProfiles.
     */
    data: XOR<VendeurProfileUpdateManyMutationInput, VendeurProfileUncheckedUpdateManyInput>
    /**
     * Filter which VendeurProfiles to update
     */
    where?: VendeurProfileWhereInput
    /**
     * Limit how many VendeurProfiles to update.
     */
    limit?: number
  }

  /**
   * VendeurProfile updateManyAndReturn
   */
  export type VendeurProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendeurProfile
     */
    select?: VendeurProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VendeurProfile
     */
    omit?: VendeurProfileOmit<ExtArgs> | null
    /**
     * The data used to update VendeurProfiles.
     */
    data: XOR<VendeurProfileUpdateManyMutationInput, VendeurProfileUncheckedUpdateManyInput>
    /**
     * Filter which VendeurProfiles to update
     */
    where?: VendeurProfileWhereInput
    /**
     * Limit how many VendeurProfiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendeurProfileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * VendeurProfile upsert
   */
  export type VendeurProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendeurProfile
     */
    select?: VendeurProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendeurProfile
     */
    omit?: VendeurProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendeurProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the VendeurProfile to update in case it exists.
     */
    where: VendeurProfileWhereUniqueInput
    /**
     * In case the VendeurProfile found by the `where` argument doesn't exist, create a new VendeurProfile with this data.
     */
    create: XOR<VendeurProfileCreateInput, VendeurProfileUncheckedCreateInput>
    /**
     * In case the VendeurProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VendeurProfileUpdateInput, VendeurProfileUncheckedUpdateInput>
  }

  /**
   * VendeurProfile delete
   */
  export type VendeurProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendeurProfile
     */
    select?: VendeurProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendeurProfile
     */
    omit?: VendeurProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendeurProfileInclude<ExtArgs> | null
    /**
     * Filter which VendeurProfile to delete.
     */
    where: VendeurProfileWhereUniqueInput
  }

  /**
   * VendeurProfile deleteMany
   */
  export type VendeurProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VendeurProfiles to delete
     */
    where?: VendeurProfileWhereInput
    /**
     * Limit how many VendeurProfiles to delete.
     */
    limit?: number
  }

  /**
   * VendeurProfile.documents
   */
  export type VendeurProfile$documentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendeurDocument
     */
    select?: VendeurDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendeurDocument
     */
    omit?: VendeurDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendeurDocumentInclude<ExtArgs> | null
    where?: VendeurDocumentWhereInput
    orderBy?: VendeurDocumentOrderByWithRelationInput | VendeurDocumentOrderByWithRelationInput[]
    cursor?: VendeurDocumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VendeurDocumentScalarFieldEnum | VendeurDocumentScalarFieldEnum[]
  }

  /**
   * VendeurProfile.products
   */
  export type VendeurProfile$productsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    cursor?: ProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * VendeurProfile.categories
   */
  export type VendeurProfile$categoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    cursor?: CategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * VendeurProfile without action
   */
  export type VendeurProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendeurProfile
     */
    select?: VendeurProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendeurProfile
     */
    omit?: VendeurProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendeurProfileInclude<ExtArgs> | null
  }


  /**
   * Model VendeurDocument
   */

  export type AggregateVendeurDocument = {
    _count: VendeurDocumentCountAggregateOutputType | null
    _min: VendeurDocumentMinAggregateOutputType | null
    _max: VendeurDocumentMaxAggregateOutputType | null
  }

  export type VendeurDocumentMinAggregateOutputType = {
    id: string | null
    vendeurId: string | null
    type: string | null
    label: string | null
    description: string | null
    fichier: string | null
    statut: $Enums.DocumentStatut | null
    adminNote: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VendeurDocumentMaxAggregateOutputType = {
    id: string | null
    vendeurId: string | null
    type: string | null
    label: string | null
    description: string | null
    fichier: string | null
    statut: $Enums.DocumentStatut | null
    adminNote: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VendeurDocumentCountAggregateOutputType = {
    id: number
    vendeurId: number
    type: number
    label: number
    description: number
    fichier: number
    statut: number
    adminNote: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VendeurDocumentMinAggregateInputType = {
    id?: true
    vendeurId?: true
    type?: true
    label?: true
    description?: true
    fichier?: true
    statut?: true
    adminNote?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VendeurDocumentMaxAggregateInputType = {
    id?: true
    vendeurId?: true
    type?: true
    label?: true
    description?: true
    fichier?: true
    statut?: true
    adminNote?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VendeurDocumentCountAggregateInputType = {
    id?: true
    vendeurId?: true
    type?: true
    label?: true
    description?: true
    fichier?: true
    statut?: true
    adminNote?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VendeurDocumentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VendeurDocument to aggregate.
     */
    where?: VendeurDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VendeurDocuments to fetch.
     */
    orderBy?: VendeurDocumentOrderByWithRelationInput | VendeurDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VendeurDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VendeurDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VendeurDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VendeurDocuments
    **/
    _count?: true | VendeurDocumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VendeurDocumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VendeurDocumentMaxAggregateInputType
  }

  export type GetVendeurDocumentAggregateType<T extends VendeurDocumentAggregateArgs> = {
        [P in keyof T & keyof AggregateVendeurDocument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVendeurDocument[P]>
      : GetScalarType<T[P], AggregateVendeurDocument[P]>
  }




  export type VendeurDocumentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VendeurDocumentWhereInput
    orderBy?: VendeurDocumentOrderByWithAggregationInput | VendeurDocumentOrderByWithAggregationInput[]
    by: VendeurDocumentScalarFieldEnum[] | VendeurDocumentScalarFieldEnum
    having?: VendeurDocumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VendeurDocumentCountAggregateInputType | true
    _min?: VendeurDocumentMinAggregateInputType
    _max?: VendeurDocumentMaxAggregateInputType
  }

  export type VendeurDocumentGroupByOutputType = {
    id: string
    vendeurId: string
    type: string
    label: string
    description: string | null
    fichier: string | null
    statut: $Enums.DocumentStatut
    adminNote: string | null
    createdAt: Date
    updatedAt: Date
    _count: VendeurDocumentCountAggregateOutputType | null
    _min: VendeurDocumentMinAggregateOutputType | null
    _max: VendeurDocumentMaxAggregateOutputType | null
  }

  type GetVendeurDocumentGroupByPayload<T extends VendeurDocumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VendeurDocumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VendeurDocumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VendeurDocumentGroupByOutputType[P]>
            : GetScalarType<T[P], VendeurDocumentGroupByOutputType[P]>
        }
      >
    >


  export type VendeurDocumentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vendeurId?: boolean
    type?: boolean
    label?: boolean
    description?: boolean
    fichier?: boolean
    statut?: boolean
    adminNote?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    vendeur?: boolean | VendeurProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vendeurDocument"]>

  export type VendeurDocumentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vendeurId?: boolean
    type?: boolean
    label?: boolean
    description?: boolean
    fichier?: boolean
    statut?: boolean
    adminNote?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    vendeur?: boolean | VendeurProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vendeurDocument"]>

  export type VendeurDocumentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vendeurId?: boolean
    type?: boolean
    label?: boolean
    description?: boolean
    fichier?: boolean
    statut?: boolean
    adminNote?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    vendeur?: boolean | VendeurProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vendeurDocument"]>

  export type VendeurDocumentSelectScalar = {
    id?: boolean
    vendeurId?: boolean
    type?: boolean
    label?: boolean
    description?: boolean
    fichier?: boolean
    statut?: boolean
    adminNote?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VendeurDocumentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "vendeurId" | "type" | "label" | "description" | "fichier" | "statut" | "adminNote" | "createdAt" | "updatedAt", ExtArgs["result"]["vendeurDocument"]>
  export type VendeurDocumentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vendeur?: boolean | VendeurProfileDefaultArgs<ExtArgs>
  }
  export type VendeurDocumentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vendeur?: boolean | VendeurProfileDefaultArgs<ExtArgs>
  }
  export type VendeurDocumentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vendeur?: boolean | VendeurProfileDefaultArgs<ExtArgs>
  }

  export type $VendeurDocumentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VendeurDocument"
    objects: {
      vendeur: Prisma.$VendeurProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      vendeurId: string
      type: string
      label: string
      description: string | null
      fichier: string | null
      statut: $Enums.DocumentStatut
      adminNote: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["vendeurDocument"]>
    composites: {}
  }

  type VendeurDocumentGetPayload<S extends boolean | null | undefined | VendeurDocumentDefaultArgs> = $Result.GetResult<Prisma.$VendeurDocumentPayload, S>

  type VendeurDocumentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VendeurDocumentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VendeurDocumentCountAggregateInputType | true
    }

  export interface VendeurDocumentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VendeurDocument'], meta: { name: 'VendeurDocument' } }
    /**
     * Find zero or one VendeurDocument that matches the filter.
     * @param {VendeurDocumentFindUniqueArgs} args - Arguments to find a VendeurDocument
     * @example
     * // Get one VendeurDocument
     * const vendeurDocument = await prisma.vendeurDocument.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VendeurDocumentFindUniqueArgs>(args: SelectSubset<T, VendeurDocumentFindUniqueArgs<ExtArgs>>): Prisma__VendeurDocumentClient<$Result.GetResult<Prisma.$VendeurDocumentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VendeurDocument that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VendeurDocumentFindUniqueOrThrowArgs} args - Arguments to find a VendeurDocument
     * @example
     * // Get one VendeurDocument
     * const vendeurDocument = await prisma.vendeurDocument.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VendeurDocumentFindUniqueOrThrowArgs>(args: SelectSubset<T, VendeurDocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VendeurDocumentClient<$Result.GetResult<Prisma.$VendeurDocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VendeurDocument that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendeurDocumentFindFirstArgs} args - Arguments to find a VendeurDocument
     * @example
     * // Get one VendeurDocument
     * const vendeurDocument = await prisma.vendeurDocument.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VendeurDocumentFindFirstArgs>(args?: SelectSubset<T, VendeurDocumentFindFirstArgs<ExtArgs>>): Prisma__VendeurDocumentClient<$Result.GetResult<Prisma.$VendeurDocumentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VendeurDocument that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendeurDocumentFindFirstOrThrowArgs} args - Arguments to find a VendeurDocument
     * @example
     * // Get one VendeurDocument
     * const vendeurDocument = await prisma.vendeurDocument.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VendeurDocumentFindFirstOrThrowArgs>(args?: SelectSubset<T, VendeurDocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma__VendeurDocumentClient<$Result.GetResult<Prisma.$VendeurDocumentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VendeurDocuments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendeurDocumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VendeurDocuments
     * const vendeurDocuments = await prisma.vendeurDocument.findMany()
     * 
     * // Get first 10 VendeurDocuments
     * const vendeurDocuments = await prisma.vendeurDocument.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vendeurDocumentWithIdOnly = await prisma.vendeurDocument.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VendeurDocumentFindManyArgs>(args?: SelectSubset<T, VendeurDocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendeurDocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VendeurDocument.
     * @param {VendeurDocumentCreateArgs} args - Arguments to create a VendeurDocument.
     * @example
     * // Create one VendeurDocument
     * const VendeurDocument = await prisma.vendeurDocument.create({
     *   data: {
     *     // ... data to create a VendeurDocument
     *   }
     * })
     * 
     */
    create<T extends VendeurDocumentCreateArgs>(args: SelectSubset<T, VendeurDocumentCreateArgs<ExtArgs>>): Prisma__VendeurDocumentClient<$Result.GetResult<Prisma.$VendeurDocumentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VendeurDocuments.
     * @param {VendeurDocumentCreateManyArgs} args - Arguments to create many VendeurDocuments.
     * @example
     * // Create many VendeurDocuments
     * const vendeurDocument = await prisma.vendeurDocument.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VendeurDocumentCreateManyArgs>(args?: SelectSubset<T, VendeurDocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VendeurDocuments and returns the data saved in the database.
     * @param {VendeurDocumentCreateManyAndReturnArgs} args - Arguments to create many VendeurDocuments.
     * @example
     * // Create many VendeurDocuments
     * const vendeurDocument = await prisma.vendeurDocument.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VendeurDocuments and only return the `id`
     * const vendeurDocumentWithIdOnly = await prisma.vendeurDocument.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VendeurDocumentCreateManyAndReturnArgs>(args?: SelectSubset<T, VendeurDocumentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendeurDocumentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VendeurDocument.
     * @param {VendeurDocumentDeleteArgs} args - Arguments to delete one VendeurDocument.
     * @example
     * // Delete one VendeurDocument
     * const VendeurDocument = await prisma.vendeurDocument.delete({
     *   where: {
     *     // ... filter to delete one VendeurDocument
     *   }
     * })
     * 
     */
    delete<T extends VendeurDocumentDeleteArgs>(args: SelectSubset<T, VendeurDocumentDeleteArgs<ExtArgs>>): Prisma__VendeurDocumentClient<$Result.GetResult<Prisma.$VendeurDocumentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VendeurDocument.
     * @param {VendeurDocumentUpdateArgs} args - Arguments to update one VendeurDocument.
     * @example
     * // Update one VendeurDocument
     * const vendeurDocument = await prisma.vendeurDocument.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VendeurDocumentUpdateArgs>(args: SelectSubset<T, VendeurDocumentUpdateArgs<ExtArgs>>): Prisma__VendeurDocumentClient<$Result.GetResult<Prisma.$VendeurDocumentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VendeurDocuments.
     * @param {VendeurDocumentDeleteManyArgs} args - Arguments to filter VendeurDocuments to delete.
     * @example
     * // Delete a few VendeurDocuments
     * const { count } = await prisma.vendeurDocument.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VendeurDocumentDeleteManyArgs>(args?: SelectSubset<T, VendeurDocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VendeurDocuments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendeurDocumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VendeurDocuments
     * const vendeurDocument = await prisma.vendeurDocument.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VendeurDocumentUpdateManyArgs>(args: SelectSubset<T, VendeurDocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VendeurDocuments and returns the data updated in the database.
     * @param {VendeurDocumentUpdateManyAndReturnArgs} args - Arguments to update many VendeurDocuments.
     * @example
     * // Update many VendeurDocuments
     * const vendeurDocument = await prisma.vendeurDocument.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VendeurDocuments and only return the `id`
     * const vendeurDocumentWithIdOnly = await prisma.vendeurDocument.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VendeurDocumentUpdateManyAndReturnArgs>(args: SelectSubset<T, VendeurDocumentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendeurDocumentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VendeurDocument.
     * @param {VendeurDocumentUpsertArgs} args - Arguments to update or create a VendeurDocument.
     * @example
     * // Update or create a VendeurDocument
     * const vendeurDocument = await prisma.vendeurDocument.upsert({
     *   create: {
     *     // ... data to create a VendeurDocument
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VendeurDocument we want to update
     *   }
     * })
     */
    upsert<T extends VendeurDocumentUpsertArgs>(args: SelectSubset<T, VendeurDocumentUpsertArgs<ExtArgs>>): Prisma__VendeurDocumentClient<$Result.GetResult<Prisma.$VendeurDocumentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VendeurDocuments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendeurDocumentCountArgs} args - Arguments to filter VendeurDocuments to count.
     * @example
     * // Count the number of VendeurDocuments
     * const count = await prisma.vendeurDocument.count({
     *   where: {
     *     // ... the filter for the VendeurDocuments we want to count
     *   }
     * })
    **/
    count<T extends VendeurDocumentCountArgs>(
      args?: Subset<T, VendeurDocumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VendeurDocumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VendeurDocument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendeurDocumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VendeurDocumentAggregateArgs>(args: Subset<T, VendeurDocumentAggregateArgs>): Prisma.PrismaPromise<GetVendeurDocumentAggregateType<T>>

    /**
     * Group by VendeurDocument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendeurDocumentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VendeurDocumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VendeurDocumentGroupByArgs['orderBy'] }
        : { orderBy?: VendeurDocumentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VendeurDocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVendeurDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VendeurDocument model
   */
  readonly fields: VendeurDocumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VendeurDocument.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VendeurDocumentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    vendeur<T extends VendeurProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VendeurProfileDefaultArgs<ExtArgs>>): Prisma__VendeurProfileClient<$Result.GetResult<Prisma.$VendeurProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VendeurDocument model
   */
  interface VendeurDocumentFieldRefs {
    readonly id: FieldRef<"VendeurDocument", 'String'>
    readonly vendeurId: FieldRef<"VendeurDocument", 'String'>
    readonly type: FieldRef<"VendeurDocument", 'String'>
    readonly label: FieldRef<"VendeurDocument", 'String'>
    readonly description: FieldRef<"VendeurDocument", 'String'>
    readonly fichier: FieldRef<"VendeurDocument", 'String'>
    readonly statut: FieldRef<"VendeurDocument", 'DocumentStatut'>
    readonly adminNote: FieldRef<"VendeurDocument", 'String'>
    readonly createdAt: FieldRef<"VendeurDocument", 'DateTime'>
    readonly updatedAt: FieldRef<"VendeurDocument", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VendeurDocument findUnique
   */
  export type VendeurDocumentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendeurDocument
     */
    select?: VendeurDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendeurDocument
     */
    omit?: VendeurDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendeurDocumentInclude<ExtArgs> | null
    /**
     * Filter, which VendeurDocument to fetch.
     */
    where: VendeurDocumentWhereUniqueInput
  }

  /**
   * VendeurDocument findUniqueOrThrow
   */
  export type VendeurDocumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendeurDocument
     */
    select?: VendeurDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendeurDocument
     */
    omit?: VendeurDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendeurDocumentInclude<ExtArgs> | null
    /**
     * Filter, which VendeurDocument to fetch.
     */
    where: VendeurDocumentWhereUniqueInput
  }

  /**
   * VendeurDocument findFirst
   */
  export type VendeurDocumentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendeurDocument
     */
    select?: VendeurDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendeurDocument
     */
    omit?: VendeurDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendeurDocumentInclude<ExtArgs> | null
    /**
     * Filter, which VendeurDocument to fetch.
     */
    where?: VendeurDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VendeurDocuments to fetch.
     */
    orderBy?: VendeurDocumentOrderByWithRelationInput | VendeurDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VendeurDocuments.
     */
    cursor?: VendeurDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VendeurDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VendeurDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VendeurDocuments.
     */
    distinct?: VendeurDocumentScalarFieldEnum | VendeurDocumentScalarFieldEnum[]
  }

  /**
   * VendeurDocument findFirstOrThrow
   */
  export type VendeurDocumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendeurDocument
     */
    select?: VendeurDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendeurDocument
     */
    omit?: VendeurDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendeurDocumentInclude<ExtArgs> | null
    /**
     * Filter, which VendeurDocument to fetch.
     */
    where?: VendeurDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VendeurDocuments to fetch.
     */
    orderBy?: VendeurDocumentOrderByWithRelationInput | VendeurDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VendeurDocuments.
     */
    cursor?: VendeurDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VendeurDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VendeurDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VendeurDocuments.
     */
    distinct?: VendeurDocumentScalarFieldEnum | VendeurDocumentScalarFieldEnum[]
  }

  /**
   * VendeurDocument findMany
   */
  export type VendeurDocumentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendeurDocument
     */
    select?: VendeurDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendeurDocument
     */
    omit?: VendeurDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendeurDocumentInclude<ExtArgs> | null
    /**
     * Filter, which VendeurDocuments to fetch.
     */
    where?: VendeurDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VendeurDocuments to fetch.
     */
    orderBy?: VendeurDocumentOrderByWithRelationInput | VendeurDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VendeurDocuments.
     */
    cursor?: VendeurDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VendeurDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VendeurDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VendeurDocuments.
     */
    distinct?: VendeurDocumentScalarFieldEnum | VendeurDocumentScalarFieldEnum[]
  }

  /**
   * VendeurDocument create
   */
  export type VendeurDocumentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendeurDocument
     */
    select?: VendeurDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendeurDocument
     */
    omit?: VendeurDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendeurDocumentInclude<ExtArgs> | null
    /**
     * The data needed to create a VendeurDocument.
     */
    data: XOR<VendeurDocumentCreateInput, VendeurDocumentUncheckedCreateInput>
  }

  /**
   * VendeurDocument createMany
   */
  export type VendeurDocumentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VendeurDocuments.
     */
    data: VendeurDocumentCreateManyInput | VendeurDocumentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VendeurDocument createManyAndReturn
   */
  export type VendeurDocumentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendeurDocument
     */
    select?: VendeurDocumentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VendeurDocument
     */
    omit?: VendeurDocumentOmit<ExtArgs> | null
    /**
     * The data used to create many VendeurDocuments.
     */
    data: VendeurDocumentCreateManyInput | VendeurDocumentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendeurDocumentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * VendeurDocument update
   */
  export type VendeurDocumentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendeurDocument
     */
    select?: VendeurDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendeurDocument
     */
    omit?: VendeurDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendeurDocumentInclude<ExtArgs> | null
    /**
     * The data needed to update a VendeurDocument.
     */
    data: XOR<VendeurDocumentUpdateInput, VendeurDocumentUncheckedUpdateInput>
    /**
     * Choose, which VendeurDocument to update.
     */
    where: VendeurDocumentWhereUniqueInput
  }

  /**
   * VendeurDocument updateMany
   */
  export type VendeurDocumentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VendeurDocuments.
     */
    data: XOR<VendeurDocumentUpdateManyMutationInput, VendeurDocumentUncheckedUpdateManyInput>
    /**
     * Filter which VendeurDocuments to update
     */
    where?: VendeurDocumentWhereInput
    /**
     * Limit how many VendeurDocuments to update.
     */
    limit?: number
  }

  /**
   * VendeurDocument updateManyAndReturn
   */
  export type VendeurDocumentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendeurDocument
     */
    select?: VendeurDocumentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VendeurDocument
     */
    omit?: VendeurDocumentOmit<ExtArgs> | null
    /**
     * The data used to update VendeurDocuments.
     */
    data: XOR<VendeurDocumentUpdateManyMutationInput, VendeurDocumentUncheckedUpdateManyInput>
    /**
     * Filter which VendeurDocuments to update
     */
    where?: VendeurDocumentWhereInput
    /**
     * Limit how many VendeurDocuments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendeurDocumentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * VendeurDocument upsert
   */
  export type VendeurDocumentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendeurDocument
     */
    select?: VendeurDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendeurDocument
     */
    omit?: VendeurDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendeurDocumentInclude<ExtArgs> | null
    /**
     * The filter to search for the VendeurDocument to update in case it exists.
     */
    where: VendeurDocumentWhereUniqueInput
    /**
     * In case the VendeurDocument found by the `where` argument doesn't exist, create a new VendeurDocument with this data.
     */
    create: XOR<VendeurDocumentCreateInput, VendeurDocumentUncheckedCreateInput>
    /**
     * In case the VendeurDocument was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VendeurDocumentUpdateInput, VendeurDocumentUncheckedUpdateInput>
  }

  /**
   * VendeurDocument delete
   */
  export type VendeurDocumentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendeurDocument
     */
    select?: VendeurDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendeurDocument
     */
    omit?: VendeurDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendeurDocumentInclude<ExtArgs> | null
    /**
     * Filter which VendeurDocument to delete.
     */
    where: VendeurDocumentWhereUniqueInput
  }

  /**
   * VendeurDocument deleteMany
   */
  export type VendeurDocumentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VendeurDocuments to delete
     */
    where?: VendeurDocumentWhereInput
    /**
     * Limit how many VendeurDocuments to delete.
     */
    limit?: number
  }

  /**
   * VendeurDocument without action
   */
  export type VendeurDocumentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendeurDocument
     */
    select?: VendeurDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendeurDocument
     */
    omit?: VendeurDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendeurDocumentInclude<ExtArgs> | null
  }


  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryMinAggregateOutputType = {
    id: string | null
    nom: string | null
    description: string | null
    image: string | null
    statut: $Enums.CategoryStatut | null
    createdAt: Date | null
    updatedAt: Date | null
    vendeurId: string | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: string | null
    nom: string | null
    description: string | null
    image: string | null
    statut: $Enums.CategoryStatut | null
    createdAt: Date | null
    updatedAt: Date | null
    vendeurId: string | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    nom: number
    description: number
    image: number
    statut: number
    createdAt: number
    updatedAt: number
    vendeurId: number
    _all: number
  }


  export type CategoryMinAggregateInputType = {
    id?: true
    nom?: true
    description?: true
    image?: true
    statut?: true
    createdAt?: true
    updatedAt?: true
    vendeurId?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    nom?: true
    description?: true
    image?: true
    statut?: true
    createdAt?: true
    updatedAt?: true
    vendeurId?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    nom?: true
    description?: true
    image?: true
    statut?: true
    createdAt?: true
    updatedAt?: true
    vendeurId?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithAggregationInput | CategoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    id: string
    nom: string
    description: string | null
    image: string | null
    statut: $Enums.CategoryStatut
    createdAt: Date
    updatedAt: Date
    vendeurId: string | null
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    description?: boolean
    image?: boolean
    statut?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    vendeurId?: boolean
    vendeur?: boolean | Category$vendeurArgs<ExtArgs>
    products?: boolean | Category$productsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    description?: boolean
    image?: boolean
    statut?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    vendeurId?: boolean
    vendeur?: boolean | Category$vendeurArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    description?: boolean
    image?: boolean
    statut?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    vendeurId?: boolean
    vendeur?: boolean | Category$vendeurArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectScalar = {
    id?: boolean
    nom?: boolean
    description?: boolean
    image?: boolean
    statut?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    vendeurId?: boolean
  }

  export type CategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nom" | "description" | "image" | "statut" | "createdAt" | "updatedAt" | "vendeurId", ExtArgs["result"]["category"]>
  export type CategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vendeur?: boolean | Category$vendeurArgs<ExtArgs>
    products?: boolean | Category$productsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vendeur?: boolean | Category$vendeurArgs<ExtArgs>
  }
  export type CategoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vendeur?: boolean | Category$vendeurArgs<ExtArgs>
  }

  export type $CategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {
      vendeur: Prisma.$VendeurProfilePayload<ExtArgs> | null
      products: Prisma.$ProductPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nom: string
      description: string | null
      image: string | null
      statut: $Enums.CategoryStatut
      createdAt: Date
      updatedAt: Date
      vendeurId: string | null
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = $Result.GetResult<Prisma.$CategoryPayload, S>

  type CategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Category'], meta: { name: 'Category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryFindUniqueArgs>(args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryFindFirstArgs>(args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoryFindManyArgs>(args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends CategoryCreateArgs>(args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryCreateManyArgs>(args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {CategoryCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends CategoryDeleteArgs>(args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryUpdateArgs>(args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryDeleteManyArgs>(args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryUpdateManyArgs>(args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories and returns the data updated in the database.
     * @param {CategoryUpdateManyAndReturnArgs} args - Arguments to update many Categories.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, CategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends CategoryUpsertArgs>(args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Category model
   */
  readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    vendeur<T extends Category$vendeurArgs<ExtArgs> = {}>(args?: Subset<T, Category$vendeurArgs<ExtArgs>>): Prisma__VendeurProfileClient<$Result.GetResult<Prisma.$VendeurProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    products<T extends Category$productsArgs<ExtArgs> = {}>(args?: Subset<T, Category$productsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Category model
   */
  interface CategoryFieldRefs {
    readonly id: FieldRef<"Category", 'String'>
    readonly nom: FieldRef<"Category", 'String'>
    readonly description: FieldRef<"Category", 'String'>
    readonly image: FieldRef<"Category", 'String'>
    readonly statut: FieldRef<"Category", 'CategoryStatut'>
    readonly createdAt: FieldRef<"Category", 'DateTime'>
    readonly updatedAt: FieldRef<"Category", 'DateTime'>
    readonly vendeurId: FieldRef<"Category", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category create
   */
  export type CategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category createManyAndReturn
   */
  export type CategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Category update
   */
  export type CategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category updateManyAndReturn
   */
  export type CategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to delete.
     */
    limit?: number
  }

  /**
   * Category.vendeur
   */
  export type Category$vendeurArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendeurProfile
     */
    select?: VendeurProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendeurProfile
     */
    omit?: VendeurProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendeurProfileInclude<ExtArgs> | null
    where?: VendeurProfileWhereInput
  }

  /**
   * Category.products
   */
  export type Category$productsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    cursor?: ProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
  }


  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductAvgAggregateOutputType = {
    prix: number | null
    stock: number | null
  }

  export type ProductSumAggregateOutputType = {
    prix: number | null
    stock: number | null
  }

  export type ProductMinAggregateOutputType = {
    id: string | null
    nom: string | null
    description: string | null
    prix: number | null
    stock: number | null
    createdAt: Date | null
    updatedAt: Date | null
    categoryId: string | null
    actif: boolean | null
    vendeurId: string | null
  }

  export type ProductMaxAggregateOutputType = {
    id: string | null
    nom: string | null
    description: string | null
    prix: number | null
    stock: number | null
    createdAt: Date | null
    updatedAt: Date | null
    categoryId: string | null
    actif: boolean | null
    vendeurId: string | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    nom: number
    description: number
    prix: number
    stock: number
    images: number
    prixVariables: number
    createdAt: number
    updatedAt: number
    categoryId: number
    actif: number
    vendeurId: number
    _all: number
  }


  export type ProductAvgAggregateInputType = {
    prix?: true
    stock?: true
  }

  export type ProductSumAggregateInputType = {
    prix?: true
    stock?: true
  }

  export type ProductMinAggregateInputType = {
    id?: true
    nom?: true
    description?: true
    prix?: true
    stock?: true
    createdAt?: true
    updatedAt?: true
    categoryId?: true
    actif?: true
    vendeurId?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    nom?: true
    description?: true
    prix?: true
    stock?: true
    createdAt?: true
    updatedAt?: true
    categoryId?: true
    actif?: true
    vendeurId?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    nom?: true
    description?: true
    prix?: true
    stock?: true
    images?: true
    prixVariables?: true
    createdAt?: true
    updatedAt?: true
    categoryId?: true
    actif?: true
    vendeurId?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _avg?: ProductAvgAggregateInputType
    _sum?: ProductSumAggregateInputType
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    id: string
    nom: string
    description: string | null
    prix: number
    stock: number
    images: string[]
    prixVariables: JsonValue | null
    createdAt: Date
    updatedAt: Date
    categoryId: string
    actif: boolean
    vendeurId: string | null
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    description?: boolean
    prix?: boolean
    stock?: boolean
    images?: boolean
    prixVariables?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    categoryId?: boolean
    actif?: boolean
    vendeurId?: boolean
    cartItems?: boolean | Product$cartItemsArgs<ExtArgs>
    favorites?: boolean | Product$favoritesArgs<ExtArgs>
    orderItems?: boolean | Product$orderItemsArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    vendeur?: boolean | Product$vendeurArgs<ExtArgs>
    variants?: boolean | Product$variantsArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    description?: boolean
    prix?: boolean
    stock?: boolean
    images?: boolean
    prixVariables?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    categoryId?: boolean
    actif?: boolean
    vendeurId?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    vendeur?: boolean | Product$vendeurArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    description?: boolean
    prix?: boolean
    stock?: boolean
    images?: boolean
    prixVariables?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    categoryId?: boolean
    actif?: boolean
    vendeurId?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    vendeur?: boolean | Product$vendeurArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectScalar = {
    id?: boolean
    nom?: boolean
    description?: boolean
    prix?: boolean
    stock?: boolean
    images?: boolean
    prixVariables?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    categoryId?: boolean
    actif?: boolean
    vendeurId?: boolean
  }

  export type ProductOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nom" | "description" | "prix" | "stock" | "images" | "prixVariables" | "createdAt" | "updatedAt" | "categoryId" | "actif" | "vendeurId", ExtArgs["result"]["product"]>
  export type ProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cartItems?: boolean | Product$cartItemsArgs<ExtArgs>
    favorites?: boolean | Product$favoritesArgs<ExtArgs>
    orderItems?: boolean | Product$orderItemsArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    vendeur?: boolean | Product$vendeurArgs<ExtArgs>
    variants?: boolean | Product$variantsArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    vendeur?: boolean | Product$vendeurArgs<ExtArgs>
  }
  export type ProductIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    vendeur?: boolean | Product$vendeurArgs<ExtArgs>
  }

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {
      cartItems: Prisma.$CartItemPayload<ExtArgs>[]
      favorites: Prisma.$FavoritePayload<ExtArgs>[]
      orderItems: Prisma.$OrderItemPayload<ExtArgs>[]
      category: Prisma.$CategoryPayload<ExtArgs>
      vendeur: Prisma.$VendeurProfilePayload<ExtArgs> | null
      variants: Prisma.$ProductVariantPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nom: string
      description: string | null
      prix: number
      stock: number
      images: string[]
      prixVariables: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
      categoryId: string
      actif: boolean
      vendeurId: string | null
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Products and returns the data saved in the database.
     * @param {ProductCreateManyAndReturnArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Products and only return the `id`
     * const productWithIdOnly = await prisma.product.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products and returns the data updated in the database.
     * @param {ProductUpdateManyAndReturnArgs} args - Arguments to update many Products.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Products and only return the `id`
     * const productWithIdOnly = await prisma.product.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cartItems<T extends Product$cartItemsArgs<ExtArgs> = {}>(args?: Subset<T, Product$cartItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    favorites<T extends Product$favoritesArgs<ExtArgs> = {}>(args?: Subset<T, Product$favoritesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    orderItems<T extends Product$orderItemsArgs<ExtArgs> = {}>(args?: Subset<T, Product$orderItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    category<T extends CategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoryDefaultArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    vendeur<T extends Product$vendeurArgs<ExtArgs> = {}>(args?: Subset<T, Product$vendeurArgs<ExtArgs>>): Prisma__VendeurProfileClient<$Result.GetResult<Prisma.$VendeurProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    variants<T extends Product$variantsArgs<ExtArgs> = {}>(args?: Subset<T, Product$variantsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Product model
   */
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", 'String'>
    readonly nom: FieldRef<"Product", 'String'>
    readonly description: FieldRef<"Product", 'String'>
    readonly prix: FieldRef<"Product", 'Float'>
    readonly stock: FieldRef<"Product", 'Int'>
    readonly images: FieldRef<"Product", 'String[]'>
    readonly prixVariables: FieldRef<"Product", 'Json'>
    readonly createdAt: FieldRef<"Product", 'DateTime'>
    readonly updatedAt: FieldRef<"Product", 'DateTime'>
    readonly categoryId: FieldRef<"Product", 'String'>
    readonly actif: FieldRef<"Product", 'Boolean'>
    readonly vendeurId: FieldRef<"Product", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product createManyAndReturn
   */
  export type ProductCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product updateManyAndReturn
   */
  export type ProductUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to delete.
     */
    limit?: number
  }

  /**
   * Product.cartItems
   */
  export type Product$cartItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartItem
     */
    omit?: CartItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null
    where?: CartItemWhereInput
    orderBy?: CartItemOrderByWithRelationInput | CartItemOrderByWithRelationInput[]
    cursor?: CartItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CartItemScalarFieldEnum | CartItemScalarFieldEnum[]
  }

  /**
   * Product.favorites
   */
  export type Product$favoritesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    where?: FavoriteWhereInput
    orderBy?: FavoriteOrderByWithRelationInput | FavoriteOrderByWithRelationInput[]
    cursor?: FavoriteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FavoriteScalarFieldEnum | FavoriteScalarFieldEnum[]
  }

  /**
   * Product.orderItems
   */
  export type Product$orderItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    cursor?: OrderItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * Product.vendeur
   */
  export type Product$vendeurArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendeurProfile
     */
    select?: VendeurProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendeurProfile
     */
    omit?: VendeurProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendeurProfileInclude<ExtArgs> | null
    where?: VendeurProfileWhereInput
  }

  /**
   * Product.variants
   */
  export type Product$variantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    where?: ProductVariantWhereInput
    orderBy?: ProductVariantOrderByWithRelationInput | ProductVariantOrderByWithRelationInput[]
    cursor?: ProductVariantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductVariantScalarFieldEnum | ProductVariantScalarFieldEnum[]
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
  }


  /**
   * Model ProductVariant
   */

  export type AggregateProductVariant = {
    _count: ProductVariantCountAggregateOutputType | null
    _avg: ProductVariantAvgAggregateOutputType | null
    _sum: ProductVariantSumAggregateOutputType | null
    _min: ProductVariantMinAggregateOutputType | null
    _max: ProductVariantMaxAggregateOutputType | null
  }

  export type ProductVariantAvgAggregateOutputType = {
    stock: number | null
  }

  export type ProductVariantSumAggregateOutputType = {
    stock: number | null
  }

  export type ProductVariantMinAggregateOutputType = {
    id: string | null
    productId: string | null
    nom: string | null
    couleur: string | null
    stock: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductVariantMaxAggregateOutputType = {
    id: string | null
    productId: string | null
    nom: string | null
    couleur: string | null
    stock: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductVariantCountAggregateOutputType = {
    id: number
    productId: number
    nom: number
    couleur: number
    stock: number
    images: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProductVariantAvgAggregateInputType = {
    stock?: true
  }

  export type ProductVariantSumAggregateInputType = {
    stock?: true
  }

  export type ProductVariantMinAggregateInputType = {
    id?: true
    productId?: true
    nom?: true
    couleur?: true
    stock?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductVariantMaxAggregateInputType = {
    id?: true
    productId?: true
    nom?: true
    couleur?: true
    stock?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductVariantCountAggregateInputType = {
    id?: true
    productId?: true
    nom?: true
    couleur?: true
    stock?: true
    images?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProductVariantAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductVariant to aggregate.
     */
    where?: ProductVariantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductVariants to fetch.
     */
    orderBy?: ProductVariantOrderByWithRelationInput | ProductVariantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductVariantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductVariants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductVariants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductVariants
    **/
    _count?: true | ProductVariantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductVariantAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductVariantSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductVariantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductVariantMaxAggregateInputType
  }

  export type GetProductVariantAggregateType<T extends ProductVariantAggregateArgs> = {
        [P in keyof T & keyof AggregateProductVariant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductVariant[P]>
      : GetScalarType<T[P], AggregateProductVariant[P]>
  }




  export type ProductVariantGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductVariantWhereInput
    orderBy?: ProductVariantOrderByWithAggregationInput | ProductVariantOrderByWithAggregationInput[]
    by: ProductVariantScalarFieldEnum[] | ProductVariantScalarFieldEnum
    having?: ProductVariantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductVariantCountAggregateInputType | true
    _avg?: ProductVariantAvgAggregateInputType
    _sum?: ProductVariantSumAggregateInputType
    _min?: ProductVariantMinAggregateInputType
    _max?: ProductVariantMaxAggregateInputType
  }

  export type ProductVariantGroupByOutputType = {
    id: string
    productId: string
    nom: string
    couleur: string | null
    stock: number
    images: string[]
    createdAt: Date
    updatedAt: Date
    _count: ProductVariantCountAggregateOutputType | null
    _avg: ProductVariantAvgAggregateOutputType | null
    _sum: ProductVariantSumAggregateOutputType | null
    _min: ProductVariantMinAggregateOutputType | null
    _max: ProductVariantMaxAggregateOutputType | null
  }

  type GetProductVariantGroupByPayload<T extends ProductVariantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductVariantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductVariantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductVariantGroupByOutputType[P]>
            : GetScalarType<T[P], ProductVariantGroupByOutputType[P]>
        }
      >
    >


  export type ProductVariantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    nom?: boolean
    couleur?: boolean
    stock?: boolean
    images?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    cartItems?: boolean | ProductVariant$cartItemsArgs<ExtArgs>
    orderItems?: boolean | ProductVariant$orderItemsArgs<ExtArgs>
    _count?: boolean | ProductVariantCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productVariant"]>

  export type ProductVariantSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    nom?: boolean
    couleur?: boolean
    stock?: boolean
    images?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productVariant"]>

  export type ProductVariantSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    nom?: boolean
    couleur?: boolean
    stock?: boolean
    images?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productVariant"]>

  export type ProductVariantSelectScalar = {
    id?: boolean
    productId?: boolean
    nom?: boolean
    couleur?: boolean
    stock?: boolean
    images?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProductVariantOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "productId" | "nom" | "couleur" | "stock" | "images" | "createdAt" | "updatedAt", ExtArgs["result"]["productVariant"]>
  export type ProductVariantInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    cartItems?: boolean | ProductVariant$cartItemsArgs<ExtArgs>
    orderItems?: boolean | ProductVariant$orderItemsArgs<ExtArgs>
    _count?: boolean | ProductVariantCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductVariantIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type ProductVariantIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $ProductVariantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductVariant"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
      cartItems: Prisma.$CartItemPayload<ExtArgs>[]
      orderItems: Prisma.$OrderItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      productId: string
      nom: string
      couleur: string | null
      stock: number
      images: string[]
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["productVariant"]>
    composites: {}
  }

  type ProductVariantGetPayload<S extends boolean | null | undefined | ProductVariantDefaultArgs> = $Result.GetResult<Prisma.$ProductVariantPayload, S>

  type ProductVariantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductVariantFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductVariantCountAggregateInputType | true
    }

  export interface ProductVariantDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductVariant'], meta: { name: 'ProductVariant' } }
    /**
     * Find zero or one ProductVariant that matches the filter.
     * @param {ProductVariantFindUniqueArgs} args - Arguments to find a ProductVariant
     * @example
     * // Get one ProductVariant
     * const productVariant = await prisma.productVariant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductVariantFindUniqueArgs>(args: SelectSubset<T, ProductVariantFindUniqueArgs<ExtArgs>>): Prisma__ProductVariantClient<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProductVariant that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductVariantFindUniqueOrThrowArgs} args - Arguments to find a ProductVariant
     * @example
     * // Get one ProductVariant
     * const productVariant = await prisma.productVariant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductVariantFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductVariantFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductVariantClient<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductVariant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariantFindFirstArgs} args - Arguments to find a ProductVariant
     * @example
     * // Get one ProductVariant
     * const productVariant = await prisma.productVariant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductVariantFindFirstArgs>(args?: SelectSubset<T, ProductVariantFindFirstArgs<ExtArgs>>): Prisma__ProductVariantClient<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductVariant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariantFindFirstOrThrowArgs} args - Arguments to find a ProductVariant
     * @example
     * // Get one ProductVariant
     * const productVariant = await prisma.productVariant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductVariantFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductVariantFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductVariantClient<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProductVariants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductVariants
     * const productVariants = await prisma.productVariant.findMany()
     * 
     * // Get first 10 ProductVariants
     * const productVariants = await prisma.productVariant.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productVariantWithIdOnly = await prisma.productVariant.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductVariantFindManyArgs>(args?: SelectSubset<T, ProductVariantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProductVariant.
     * @param {ProductVariantCreateArgs} args - Arguments to create a ProductVariant.
     * @example
     * // Create one ProductVariant
     * const ProductVariant = await prisma.productVariant.create({
     *   data: {
     *     // ... data to create a ProductVariant
     *   }
     * })
     * 
     */
    create<T extends ProductVariantCreateArgs>(args: SelectSubset<T, ProductVariantCreateArgs<ExtArgs>>): Prisma__ProductVariantClient<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProductVariants.
     * @param {ProductVariantCreateManyArgs} args - Arguments to create many ProductVariants.
     * @example
     * // Create many ProductVariants
     * const productVariant = await prisma.productVariant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductVariantCreateManyArgs>(args?: SelectSubset<T, ProductVariantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProductVariants and returns the data saved in the database.
     * @param {ProductVariantCreateManyAndReturnArgs} args - Arguments to create many ProductVariants.
     * @example
     * // Create many ProductVariants
     * const productVariant = await prisma.productVariant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProductVariants and only return the `id`
     * const productVariantWithIdOnly = await prisma.productVariant.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductVariantCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductVariantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProductVariant.
     * @param {ProductVariantDeleteArgs} args - Arguments to delete one ProductVariant.
     * @example
     * // Delete one ProductVariant
     * const ProductVariant = await prisma.productVariant.delete({
     *   where: {
     *     // ... filter to delete one ProductVariant
     *   }
     * })
     * 
     */
    delete<T extends ProductVariantDeleteArgs>(args: SelectSubset<T, ProductVariantDeleteArgs<ExtArgs>>): Prisma__ProductVariantClient<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProductVariant.
     * @param {ProductVariantUpdateArgs} args - Arguments to update one ProductVariant.
     * @example
     * // Update one ProductVariant
     * const productVariant = await prisma.productVariant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductVariantUpdateArgs>(args: SelectSubset<T, ProductVariantUpdateArgs<ExtArgs>>): Prisma__ProductVariantClient<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProductVariants.
     * @param {ProductVariantDeleteManyArgs} args - Arguments to filter ProductVariants to delete.
     * @example
     * // Delete a few ProductVariants
     * const { count } = await prisma.productVariant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductVariantDeleteManyArgs>(args?: SelectSubset<T, ProductVariantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductVariants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductVariants
     * const productVariant = await prisma.productVariant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductVariantUpdateManyArgs>(args: SelectSubset<T, ProductVariantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductVariants and returns the data updated in the database.
     * @param {ProductVariantUpdateManyAndReturnArgs} args - Arguments to update many ProductVariants.
     * @example
     * // Update many ProductVariants
     * const productVariant = await prisma.productVariant.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProductVariants and only return the `id`
     * const productVariantWithIdOnly = await prisma.productVariant.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductVariantUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductVariantUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProductVariant.
     * @param {ProductVariantUpsertArgs} args - Arguments to update or create a ProductVariant.
     * @example
     * // Update or create a ProductVariant
     * const productVariant = await prisma.productVariant.upsert({
     *   create: {
     *     // ... data to create a ProductVariant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductVariant we want to update
     *   }
     * })
     */
    upsert<T extends ProductVariantUpsertArgs>(args: SelectSubset<T, ProductVariantUpsertArgs<ExtArgs>>): Prisma__ProductVariantClient<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProductVariants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariantCountArgs} args - Arguments to filter ProductVariants to count.
     * @example
     * // Count the number of ProductVariants
     * const count = await prisma.productVariant.count({
     *   where: {
     *     // ... the filter for the ProductVariants we want to count
     *   }
     * })
    **/
    count<T extends ProductVariantCountArgs>(
      args?: Subset<T, ProductVariantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductVariantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductVariant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductVariantAggregateArgs>(args: Subset<T, ProductVariantAggregateArgs>): Prisma.PrismaPromise<GetProductVariantAggregateType<T>>

    /**
     * Group by ProductVariant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariantGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductVariantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductVariantGroupByArgs['orderBy'] }
        : { orderBy?: ProductVariantGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductVariantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductVariantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductVariant model
   */
  readonly fields: ProductVariantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductVariant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductVariantClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    cartItems<T extends ProductVariant$cartItemsArgs<ExtArgs> = {}>(args?: Subset<T, ProductVariant$cartItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    orderItems<T extends ProductVariant$orderItemsArgs<ExtArgs> = {}>(args?: Subset<T, ProductVariant$orderItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProductVariant model
   */
  interface ProductVariantFieldRefs {
    readonly id: FieldRef<"ProductVariant", 'String'>
    readonly productId: FieldRef<"ProductVariant", 'String'>
    readonly nom: FieldRef<"ProductVariant", 'String'>
    readonly couleur: FieldRef<"ProductVariant", 'String'>
    readonly stock: FieldRef<"ProductVariant", 'Int'>
    readonly images: FieldRef<"ProductVariant", 'String[]'>
    readonly createdAt: FieldRef<"ProductVariant", 'DateTime'>
    readonly updatedAt: FieldRef<"ProductVariant", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProductVariant findUnique
   */
  export type ProductVariantFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    /**
     * Filter, which ProductVariant to fetch.
     */
    where: ProductVariantWhereUniqueInput
  }

  /**
   * ProductVariant findUniqueOrThrow
   */
  export type ProductVariantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    /**
     * Filter, which ProductVariant to fetch.
     */
    where: ProductVariantWhereUniqueInput
  }

  /**
   * ProductVariant findFirst
   */
  export type ProductVariantFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    /**
     * Filter, which ProductVariant to fetch.
     */
    where?: ProductVariantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductVariants to fetch.
     */
    orderBy?: ProductVariantOrderByWithRelationInput | ProductVariantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductVariants.
     */
    cursor?: ProductVariantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductVariants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductVariants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductVariants.
     */
    distinct?: ProductVariantScalarFieldEnum | ProductVariantScalarFieldEnum[]
  }

  /**
   * ProductVariant findFirstOrThrow
   */
  export type ProductVariantFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    /**
     * Filter, which ProductVariant to fetch.
     */
    where?: ProductVariantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductVariants to fetch.
     */
    orderBy?: ProductVariantOrderByWithRelationInput | ProductVariantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductVariants.
     */
    cursor?: ProductVariantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductVariants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductVariants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductVariants.
     */
    distinct?: ProductVariantScalarFieldEnum | ProductVariantScalarFieldEnum[]
  }

  /**
   * ProductVariant findMany
   */
  export type ProductVariantFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    /**
     * Filter, which ProductVariants to fetch.
     */
    where?: ProductVariantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductVariants to fetch.
     */
    orderBy?: ProductVariantOrderByWithRelationInput | ProductVariantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductVariants.
     */
    cursor?: ProductVariantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductVariants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductVariants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductVariants.
     */
    distinct?: ProductVariantScalarFieldEnum | ProductVariantScalarFieldEnum[]
  }

  /**
   * ProductVariant create
   */
  export type ProductVariantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    /**
     * The data needed to create a ProductVariant.
     */
    data: XOR<ProductVariantCreateInput, ProductVariantUncheckedCreateInput>
  }

  /**
   * ProductVariant createMany
   */
  export type ProductVariantCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductVariants.
     */
    data: ProductVariantCreateManyInput | ProductVariantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductVariant createManyAndReturn
   */
  export type ProductVariantCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * The data used to create many ProductVariants.
     */
    data: ProductVariantCreateManyInput | ProductVariantCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProductVariant update
   */
  export type ProductVariantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    /**
     * The data needed to update a ProductVariant.
     */
    data: XOR<ProductVariantUpdateInput, ProductVariantUncheckedUpdateInput>
    /**
     * Choose, which ProductVariant to update.
     */
    where: ProductVariantWhereUniqueInput
  }

  /**
   * ProductVariant updateMany
   */
  export type ProductVariantUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductVariants.
     */
    data: XOR<ProductVariantUpdateManyMutationInput, ProductVariantUncheckedUpdateManyInput>
    /**
     * Filter which ProductVariants to update
     */
    where?: ProductVariantWhereInput
    /**
     * Limit how many ProductVariants to update.
     */
    limit?: number
  }

  /**
   * ProductVariant updateManyAndReturn
   */
  export type ProductVariantUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * The data used to update ProductVariants.
     */
    data: XOR<ProductVariantUpdateManyMutationInput, ProductVariantUncheckedUpdateManyInput>
    /**
     * Filter which ProductVariants to update
     */
    where?: ProductVariantWhereInput
    /**
     * Limit how many ProductVariants to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProductVariant upsert
   */
  export type ProductVariantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    /**
     * The filter to search for the ProductVariant to update in case it exists.
     */
    where: ProductVariantWhereUniqueInput
    /**
     * In case the ProductVariant found by the `where` argument doesn't exist, create a new ProductVariant with this data.
     */
    create: XOR<ProductVariantCreateInput, ProductVariantUncheckedCreateInput>
    /**
     * In case the ProductVariant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductVariantUpdateInput, ProductVariantUncheckedUpdateInput>
  }

  /**
   * ProductVariant delete
   */
  export type ProductVariantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    /**
     * Filter which ProductVariant to delete.
     */
    where: ProductVariantWhereUniqueInput
  }

  /**
   * ProductVariant deleteMany
   */
  export type ProductVariantDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductVariants to delete
     */
    where?: ProductVariantWhereInput
    /**
     * Limit how many ProductVariants to delete.
     */
    limit?: number
  }

  /**
   * ProductVariant.cartItems
   */
  export type ProductVariant$cartItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartItem
     */
    omit?: CartItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null
    where?: CartItemWhereInput
    orderBy?: CartItemOrderByWithRelationInput | CartItemOrderByWithRelationInput[]
    cursor?: CartItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CartItemScalarFieldEnum | CartItemScalarFieldEnum[]
  }

  /**
   * ProductVariant.orderItems
   */
  export type ProductVariant$orderItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    cursor?: OrderItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * ProductVariant without action
   */
  export type ProductVariantDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
  }


  /**
   * Model Cart
   */

  export type AggregateCart = {
    _count: CartCountAggregateOutputType | null
    _min: CartMinAggregateOutputType | null
    _max: CartMaxAggregateOutputType | null
  }

  export type CartMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type CartMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type CartCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    userId: number
    _all: number
  }


  export type CartMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type CartMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type CartCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    _all?: true
  }

  export type CartAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Cart to aggregate.
     */
    where?: CartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Carts to fetch.
     */
    orderBy?: CartOrderByWithRelationInput | CartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Carts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Carts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Carts
    **/
    _count?: true | CartCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CartMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CartMaxAggregateInputType
  }

  export type GetCartAggregateType<T extends CartAggregateArgs> = {
        [P in keyof T & keyof AggregateCart]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCart[P]>
      : GetScalarType<T[P], AggregateCart[P]>
  }




  export type CartGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CartWhereInput
    orderBy?: CartOrderByWithAggregationInput | CartOrderByWithAggregationInput[]
    by: CartScalarFieldEnum[] | CartScalarFieldEnum
    having?: CartScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CartCountAggregateInputType | true
    _min?: CartMinAggregateInputType
    _max?: CartMaxAggregateInputType
  }

  export type CartGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    userId: string
    _count: CartCountAggregateOutputType | null
    _min: CartMinAggregateOutputType | null
    _max: CartMaxAggregateOutputType | null
  }

  type GetCartGroupByPayload<T extends CartGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CartGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CartGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CartGroupByOutputType[P]>
            : GetScalarType<T[P], CartGroupByOutputType[P]>
        }
      >
    >


  export type CartSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    items?: boolean | Cart$itemsArgs<ExtArgs>
    _count?: boolean | CartCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cart"]>

  export type CartSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cart"]>

  export type CartSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cart"]>

  export type CartSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
  }

  export type CartOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "userId", ExtArgs["result"]["cart"]>
  export type CartInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    items?: boolean | Cart$itemsArgs<ExtArgs>
    _count?: boolean | CartCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CartIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CartIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CartPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Cart"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      items: Prisma.$CartItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      userId: string
    }, ExtArgs["result"]["cart"]>
    composites: {}
  }

  type CartGetPayload<S extends boolean | null | undefined | CartDefaultArgs> = $Result.GetResult<Prisma.$CartPayload, S>

  type CartCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CartFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CartCountAggregateInputType | true
    }

  export interface CartDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Cart'], meta: { name: 'Cart' } }
    /**
     * Find zero or one Cart that matches the filter.
     * @param {CartFindUniqueArgs} args - Arguments to find a Cart
     * @example
     * // Get one Cart
     * const cart = await prisma.cart.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CartFindUniqueArgs>(args: SelectSubset<T, CartFindUniqueArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Cart that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CartFindUniqueOrThrowArgs} args - Arguments to find a Cart
     * @example
     * // Get one Cart
     * const cart = await prisma.cart.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CartFindUniqueOrThrowArgs>(args: SelectSubset<T, CartFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cart that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartFindFirstArgs} args - Arguments to find a Cart
     * @example
     * // Get one Cart
     * const cart = await prisma.cart.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CartFindFirstArgs>(args?: SelectSubset<T, CartFindFirstArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cart that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartFindFirstOrThrowArgs} args - Arguments to find a Cart
     * @example
     * // Get one Cart
     * const cart = await prisma.cart.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CartFindFirstOrThrowArgs>(args?: SelectSubset<T, CartFindFirstOrThrowArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Carts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Carts
     * const carts = await prisma.cart.findMany()
     * 
     * // Get first 10 Carts
     * const carts = await prisma.cart.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cartWithIdOnly = await prisma.cart.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CartFindManyArgs>(args?: SelectSubset<T, CartFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Cart.
     * @param {CartCreateArgs} args - Arguments to create a Cart.
     * @example
     * // Create one Cart
     * const Cart = await prisma.cart.create({
     *   data: {
     *     // ... data to create a Cart
     *   }
     * })
     * 
     */
    create<T extends CartCreateArgs>(args: SelectSubset<T, CartCreateArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Carts.
     * @param {CartCreateManyArgs} args - Arguments to create many Carts.
     * @example
     * // Create many Carts
     * const cart = await prisma.cart.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CartCreateManyArgs>(args?: SelectSubset<T, CartCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Carts and returns the data saved in the database.
     * @param {CartCreateManyAndReturnArgs} args - Arguments to create many Carts.
     * @example
     * // Create many Carts
     * const cart = await prisma.cart.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Carts and only return the `id`
     * const cartWithIdOnly = await prisma.cart.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CartCreateManyAndReturnArgs>(args?: SelectSubset<T, CartCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Cart.
     * @param {CartDeleteArgs} args - Arguments to delete one Cart.
     * @example
     * // Delete one Cart
     * const Cart = await prisma.cart.delete({
     *   where: {
     *     // ... filter to delete one Cart
     *   }
     * })
     * 
     */
    delete<T extends CartDeleteArgs>(args: SelectSubset<T, CartDeleteArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Cart.
     * @param {CartUpdateArgs} args - Arguments to update one Cart.
     * @example
     * // Update one Cart
     * const cart = await prisma.cart.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CartUpdateArgs>(args: SelectSubset<T, CartUpdateArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Carts.
     * @param {CartDeleteManyArgs} args - Arguments to filter Carts to delete.
     * @example
     * // Delete a few Carts
     * const { count } = await prisma.cart.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CartDeleteManyArgs>(args?: SelectSubset<T, CartDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Carts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Carts
     * const cart = await prisma.cart.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CartUpdateManyArgs>(args: SelectSubset<T, CartUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Carts and returns the data updated in the database.
     * @param {CartUpdateManyAndReturnArgs} args - Arguments to update many Carts.
     * @example
     * // Update many Carts
     * const cart = await prisma.cart.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Carts and only return the `id`
     * const cartWithIdOnly = await prisma.cart.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CartUpdateManyAndReturnArgs>(args: SelectSubset<T, CartUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Cart.
     * @param {CartUpsertArgs} args - Arguments to update or create a Cart.
     * @example
     * // Update or create a Cart
     * const cart = await prisma.cart.upsert({
     *   create: {
     *     // ... data to create a Cart
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Cart we want to update
     *   }
     * })
     */
    upsert<T extends CartUpsertArgs>(args: SelectSubset<T, CartUpsertArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Carts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartCountArgs} args - Arguments to filter Carts to count.
     * @example
     * // Count the number of Carts
     * const count = await prisma.cart.count({
     *   where: {
     *     // ... the filter for the Carts we want to count
     *   }
     * })
    **/
    count<T extends CartCountArgs>(
      args?: Subset<T, CartCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CartCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Cart.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CartAggregateArgs>(args: Subset<T, CartAggregateArgs>): Prisma.PrismaPromise<GetCartAggregateType<T>>

    /**
     * Group by Cart.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CartGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CartGroupByArgs['orderBy'] }
        : { orderBy?: CartGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CartGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCartGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Cart model
   */
  readonly fields: CartFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Cart.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CartClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    items<T extends Cart$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Cart$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Cart model
   */
  interface CartFieldRefs {
    readonly id: FieldRef<"Cart", 'String'>
    readonly createdAt: FieldRef<"Cart", 'DateTime'>
    readonly updatedAt: FieldRef<"Cart", 'DateTime'>
    readonly userId: FieldRef<"Cart", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Cart findUnique
   */
  export type CartFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cart
     */
    omit?: CartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * Filter, which Cart to fetch.
     */
    where: CartWhereUniqueInput
  }

  /**
   * Cart findUniqueOrThrow
   */
  export type CartFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cart
     */
    omit?: CartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * Filter, which Cart to fetch.
     */
    where: CartWhereUniqueInput
  }

  /**
   * Cart findFirst
   */
  export type CartFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cart
     */
    omit?: CartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * Filter, which Cart to fetch.
     */
    where?: CartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Carts to fetch.
     */
    orderBy?: CartOrderByWithRelationInput | CartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Carts.
     */
    cursor?: CartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Carts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Carts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Carts.
     */
    distinct?: CartScalarFieldEnum | CartScalarFieldEnum[]
  }

  /**
   * Cart findFirstOrThrow
   */
  export type CartFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cart
     */
    omit?: CartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * Filter, which Cart to fetch.
     */
    where?: CartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Carts to fetch.
     */
    orderBy?: CartOrderByWithRelationInput | CartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Carts.
     */
    cursor?: CartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Carts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Carts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Carts.
     */
    distinct?: CartScalarFieldEnum | CartScalarFieldEnum[]
  }

  /**
   * Cart findMany
   */
  export type CartFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cart
     */
    omit?: CartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * Filter, which Carts to fetch.
     */
    where?: CartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Carts to fetch.
     */
    orderBy?: CartOrderByWithRelationInput | CartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Carts.
     */
    cursor?: CartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Carts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Carts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Carts.
     */
    distinct?: CartScalarFieldEnum | CartScalarFieldEnum[]
  }

  /**
   * Cart create
   */
  export type CartCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cart
     */
    omit?: CartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * The data needed to create a Cart.
     */
    data: XOR<CartCreateInput, CartUncheckedCreateInput>
  }

  /**
   * Cart createMany
   */
  export type CartCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Carts.
     */
    data: CartCreateManyInput | CartCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Cart createManyAndReturn
   */
  export type CartCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Cart
     */
    omit?: CartOmit<ExtArgs> | null
    /**
     * The data used to create many Carts.
     */
    data: CartCreateManyInput | CartCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Cart update
   */
  export type CartUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cart
     */
    omit?: CartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * The data needed to update a Cart.
     */
    data: XOR<CartUpdateInput, CartUncheckedUpdateInput>
    /**
     * Choose, which Cart to update.
     */
    where: CartWhereUniqueInput
  }

  /**
   * Cart updateMany
   */
  export type CartUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Carts.
     */
    data: XOR<CartUpdateManyMutationInput, CartUncheckedUpdateManyInput>
    /**
     * Filter which Carts to update
     */
    where?: CartWhereInput
    /**
     * Limit how many Carts to update.
     */
    limit?: number
  }

  /**
   * Cart updateManyAndReturn
   */
  export type CartUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Cart
     */
    omit?: CartOmit<ExtArgs> | null
    /**
     * The data used to update Carts.
     */
    data: XOR<CartUpdateManyMutationInput, CartUncheckedUpdateManyInput>
    /**
     * Filter which Carts to update
     */
    where?: CartWhereInput
    /**
     * Limit how many Carts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Cart upsert
   */
  export type CartUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cart
     */
    omit?: CartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * The filter to search for the Cart to update in case it exists.
     */
    where: CartWhereUniqueInput
    /**
     * In case the Cart found by the `where` argument doesn't exist, create a new Cart with this data.
     */
    create: XOR<CartCreateInput, CartUncheckedCreateInput>
    /**
     * In case the Cart was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CartUpdateInput, CartUncheckedUpdateInput>
  }

  /**
   * Cart delete
   */
  export type CartDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cart
     */
    omit?: CartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * Filter which Cart to delete.
     */
    where: CartWhereUniqueInput
  }

  /**
   * Cart deleteMany
   */
  export type CartDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Carts to delete
     */
    where?: CartWhereInput
    /**
     * Limit how many Carts to delete.
     */
    limit?: number
  }

  /**
   * Cart.items
   */
  export type Cart$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartItem
     */
    omit?: CartItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null
    where?: CartItemWhereInput
    orderBy?: CartItemOrderByWithRelationInput | CartItemOrderByWithRelationInput[]
    cursor?: CartItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CartItemScalarFieldEnum | CartItemScalarFieldEnum[]
  }

  /**
   * Cart without action
   */
  export type CartDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cart
     */
    omit?: CartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
  }


  /**
   * Model CartItem
   */

  export type AggregateCartItem = {
    _count: CartItemCountAggregateOutputType | null
    _avg: CartItemAvgAggregateOutputType | null
    _sum: CartItemSumAggregateOutputType | null
    _min: CartItemMinAggregateOutputType | null
    _max: CartItemMaxAggregateOutputType | null
  }

  export type CartItemAvgAggregateOutputType = {
    quantite: number | null
  }

  export type CartItemSumAggregateOutputType = {
    quantite: number | null
  }

  export type CartItemMinAggregateOutputType = {
    id: string | null
    quantite: number | null
    cartId: string | null
    productId: string | null
    variantId: string | null
  }

  export type CartItemMaxAggregateOutputType = {
    id: string | null
    quantite: number | null
    cartId: string | null
    productId: string | null
    variantId: string | null
  }

  export type CartItemCountAggregateOutputType = {
    id: number
    quantite: number
    cartId: number
    productId: number
    variantId: number
    _all: number
  }


  export type CartItemAvgAggregateInputType = {
    quantite?: true
  }

  export type CartItemSumAggregateInputType = {
    quantite?: true
  }

  export type CartItemMinAggregateInputType = {
    id?: true
    quantite?: true
    cartId?: true
    productId?: true
    variantId?: true
  }

  export type CartItemMaxAggregateInputType = {
    id?: true
    quantite?: true
    cartId?: true
    productId?: true
    variantId?: true
  }

  export type CartItemCountAggregateInputType = {
    id?: true
    quantite?: true
    cartId?: true
    productId?: true
    variantId?: true
    _all?: true
  }

  export type CartItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CartItem to aggregate.
     */
    where?: CartItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CartItems to fetch.
     */
    orderBy?: CartItemOrderByWithRelationInput | CartItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CartItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CartItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CartItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CartItems
    **/
    _count?: true | CartItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CartItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CartItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CartItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CartItemMaxAggregateInputType
  }

  export type GetCartItemAggregateType<T extends CartItemAggregateArgs> = {
        [P in keyof T & keyof AggregateCartItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCartItem[P]>
      : GetScalarType<T[P], AggregateCartItem[P]>
  }




  export type CartItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CartItemWhereInput
    orderBy?: CartItemOrderByWithAggregationInput | CartItemOrderByWithAggregationInput[]
    by: CartItemScalarFieldEnum[] | CartItemScalarFieldEnum
    having?: CartItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CartItemCountAggregateInputType | true
    _avg?: CartItemAvgAggregateInputType
    _sum?: CartItemSumAggregateInputType
    _min?: CartItemMinAggregateInputType
    _max?: CartItemMaxAggregateInputType
  }

  export type CartItemGroupByOutputType = {
    id: string
    quantite: number
    cartId: string
    productId: string
    variantId: string | null
    _count: CartItemCountAggregateOutputType | null
    _avg: CartItemAvgAggregateOutputType | null
    _sum: CartItemSumAggregateOutputType | null
    _min: CartItemMinAggregateOutputType | null
    _max: CartItemMaxAggregateOutputType | null
  }

  type GetCartItemGroupByPayload<T extends CartItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CartItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CartItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CartItemGroupByOutputType[P]>
            : GetScalarType<T[P], CartItemGroupByOutputType[P]>
        }
      >
    >


  export type CartItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    quantite?: boolean
    cartId?: boolean
    productId?: boolean
    variantId?: boolean
    cart?: boolean | CartDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
    variant?: boolean | CartItem$variantArgs<ExtArgs>
  }, ExtArgs["result"]["cartItem"]>

  export type CartItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    quantite?: boolean
    cartId?: boolean
    productId?: boolean
    variantId?: boolean
    cart?: boolean | CartDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
    variant?: boolean | CartItem$variantArgs<ExtArgs>
  }, ExtArgs["result"]["cartItem"]>

  export type CartItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    quantite?: boolean
    cartId?: boolean
    productId?: boolean
    variantId?: boolean
    cart?: boolean | CartDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
    variant?: boolean | CartItem$variantArgs<ExtArgs>
  }, ExtArgs["result"]["cartItem"]>

  export type CartItemSelectScalar = {
    id?: boolean
    quantite?: boolean
    cartId?: boolean
    productId?: boolean
    variantId?: boolean
  }

  export type CartItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "quantite" | "cartId" | "productId" | "variantId", ExtArgs["result"]["cartItem"]>
  export type CartItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cart?: boolean | CartDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
    variant?: boolean | CartItem$variantArgs<ExtArgs>
  }
  export type CartItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cart?: boolean | CartDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
    variant?: boolean | CartItem$variantArgs<ExtArgs>
  }
  export type CartItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cart?: boolean | CartDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
    variant?: boolean | CartItem$variantArgs<ExtArgs>
  }

  export type $CartItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CartItem"
    objects: {
      cart: Prisma.$CartPayload<ExtArgs>
      product: Prisma.$ProductPayload<ExtArgs>
      variant: Prisma.$ProductVariantPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      quantite: number
      cartId: string
      productId: string
      variantId: string | null
    }, ExtArgs["result"]["cartItem"]>
    composites: {}
  }

  type CartItemGetPayload<S extends boolean | null | undefined | CartItemDefaultArgs> = $Result.GetResult<Prisma.$CartItemPayload, S>

  type CartItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CartItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CartItemCountAggregateInputType | true
    }

  export interface CartItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CartItem'], meta: { name: 'CartItem' } }
    /**
     * Find zero or one CartItem that matches the filter.
     * @param {CartItemFindUniqueArgs} args - Arguments to find a CartItem
     * @example
     * // Get one CartItem
     * const cartItem = await prisma.cartItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CartItemFindUniqueArgs>(args: SelectSubset<T, CartItemFindUniqueArgs<ExtArgs>>): Prisma__CartItemClient<$Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CartItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CartItemFindUniqueOrThrowArgs} args - Arguments to find a CartItem
     * @example
     * // Get one CartItem
     * const cartItem = await prisma.cartItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CartItemFindUniqueOrThrowArgs>(args: SelectSubset<T, CartItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CartItemClient<$Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CartItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartItemFindFirstArgs} args - Arguments to find a CartItem
     * @example
     * // Get one CartItem
     * const cartItem = await prisma.cartItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CartItemFindFirstArgs>(args?: SelectSubset<T, CartItemFindFirstArgs<ExtArgs>>): Prisma__CartItemClient<$Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CartItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartItemFindFirstOrThrowArgs} args - Arguments to find a CartItem
     * @example
     * // Get one CartItem
     * const cartItem = await prisma.cartItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CartItemFindFirstOrThrowArgs>(args?: SelectSubset<T, CartItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__CartItemClient<$Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CartItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CartItems
     * const cartItems = await prisma.cartItem.findMany()
     * 
     * // Get first 10 CartItems
     * const cartItems = await prisma.cartItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cartItemWithIdOnly = await prisma.cartItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CartItemFindManyArgs>(args?: SelectSubset<T, CartItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CartItem.
     * @param {CartItemCreateArgs} args - Arguments to create a CartItem.
     * @example
     * // Create one CartItem
     * const CartItem = await prisma.cartItem.create({
     *   data: {
     *     // ... data to create a CartItem
     *   }
     * })
     * 
     */
    create<T extends CartItemCreateArgs>(args: SelectSubset<T, CartItemCreateArgs<ExtArgs>>): Prisma__CartItemClient<$Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CartItems.
     * @param {CartItemCreateManyArgs} args - Arguments to create many CartItems.
     * @example
     * // Create many CartItems
     * const cartItem = await prisma.cartItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CartItemCreateManyArgs>(args?: SelectSubset<T, CartItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CartItems and returns the data saved in the database.
     * @param {CartItemCreateManyAndReturnArgs} args - Arguments to create many CartItems.
     * @example
     * // Create many CartItems
     * const cartItem = await prisma.cartItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CartItems and only return the `id`
     * const cartItemWithIdOnly = await prisma.cartItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CartItemCreateManyAndReturnArgs>(args?: SelectSubset<T, CartItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CartItem.
     * @param {CartItemDeleteArgs} args - Arguments to delete one CartItem.
     * @example
     * // Delete one CartItem
     * const CartItem = await prisma.cartItem.delete({
     *   where: {
     *     // ... filter to delete one CartItem
     *   }
     * })
     * 
     */
    delete<T extends CartItemDeleteArgs>(args: SelectSubset<T, CartItemDeleteArgs<ExtArgs>>): Prisma__CartItemClient<$Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CartItem.
     * @param {CartItemUpdateArgs} args - Arguments to update one CartItem.
     * @example
     * // Update one CartItem
     * const cartItem = await prisma.cartItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CartItemUpdateArgs>(args: SelectSubset<T, CartItemUpdateArgs<ExtArgs>>): Prisma__CartItemClient<$Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CartItems.
     * @param {CartItemDeleteManyArgs} args - Arguments to filter CartItems to delete.
     * @example
     * // Delete a few CartItems
     * const { count } = await prisma.cartItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CartItemDeleteManyArgs>(args?: SelectSubset<T, CartItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CartItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CartItems
     * const cartItem = await prisma.cartItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CartItemUpdateManyArgs>(args: SelectSubset<T, CartItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CartItems and returns the data updated in the database.
     * @param {CartItemUpdateManyAndReturnArgs} args - Arguments to update many CartItems.
     * @example
     * // Update many CartItems
     * const cartItem = await prisma.cartItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CartItems and only return the `id`
     * const cartItemWithIdOnly = await prisma.cartItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CartItemUpdateManyAndReturnArgs>(args: SelectSubset<T, CartItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CartItem.
     * @param {CartItemUpsertArgs} args - Arguments to update or create a CartItem.
     * @example
     * // Update or create a CartItem
     * const cartItem = await prisma.cartItem.upsert({
     *   create: {
     *     // ... data to create a CartItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CartItem we want to update
     *   }
     * })
     */
    upsert<T extends CartItemUpsertArgs>(args: SelectSubset<T, CartItemUpsertArgs<ExtArgs>>): Prisma__CartItemClient<$Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CartItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartItemCountArgs} args - Arguments to filter CartItems to count.
     * @example
     * // Count the number of CartItems
     * const count = await prisma.cartItem.count({
     *   where: {
     *     // ... the filter for the CartItems we want to count
     *   }
     * })
    **/
    count<T extends CartItemCountArgs>(
      args?: Subset<T, CartItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CartItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CartItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CartItemAggregateArgs>(args: Subset<T, CartItemAggregateArgs>): Prisma.PrismaPromise<GetCartItemAggregateType<T>>

    /**
     * Group by CartItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CartItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CartItemGroupByArgs['orderBy'] }
        : { orderBy?: CartItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CartItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCartItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CartItem model
   */
  readonly fields: CartItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CartItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CartItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cart<T extends CartDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CartDefaultArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    variant<T extends CartItem$variantArgs<ExtArgs> = {}>(args?: Subset<T, CartItem$variantArgs<ExtArgs>>): Prisma__ProductVariantClient<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CartItem model
   */
  interface CartItemFieldRefs {
    readonly id: FieldRef<"CartItem", 'String'>
    readonly quantite: FieldRef<"CartItem", 'Int'>
    readonly cartId: FieldRef<"CartItem", 'String'>
    readonly productId: FieldRef<"CartItem", 'String'>
    readonly variantId: FieldRef<"CartItem", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CartItem findUnique
   */
  export type CartItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartItem
     */
    omit?: CartItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null
    /**
     * Filter, which CartItem to fetch.
     */
    where: CartItemWhereUniqueInput
  }

  /**
   * CartItem findUniqueOrThrow
   */
  export type CartItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartItem
     */
    omit?: CartItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null
    /**
     * Filter, which CartItem to fetch.
     */
    where: CartItemWhereUniqueInput
  }

  /**
   * CartItem findFirst
   */
  export type CartItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartItem
     */
    omit?: CartItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null
    /**
     * Filter, which CartItem to fetch.
     */
    where?: CartItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CartItems to fetch.
     */
    orderBy?: CartItemOrderByWithRelationInput | CartItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CartItems.
     */
    cursor?: CartItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CartItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CartItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CartItems.
     */
    distinct?: CartItemScalarFieldEnum | CartItemScalarFieldEnum[]
  }

  /**
   * CartItem findFirstOrThrow
   */
  export type CartItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartItem
     */
    omit?: CartItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null
    /**
     * Filter, which CartItem to fetch.
     */
    where?: CartItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CartItems to fetch.
     */
    orderBy?: CartItemOrderByWithRelationInput | CartItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CartItems.
     */
    cursor?: CartItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CartItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CartItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CartItems.
     */
    distinct?: CartItemScalarFieldEnum | CartItemScalarFieldEnum[]
  }

  /**
   * CartItem findMany
   */
  export type CartItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartItem
     */
    omit?: CartItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null
    /**
     * Filter, which CartItems to fetch.
     */
    where?: CartItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CartItems to fetch.
     */
    orderBy?: CartItemOrderByWithRelationInput | CartItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CartItems.
     */
    cursor?: CartItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CartItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CartItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CartItems.
     */
    distinct?: CartItemScalarFieldEnum | CartItemScalarFieldEnum[]
  }

  /**
   * CartItem create
   */
  export type CartItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartItem
     */
    omit?: CartItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null
    /**
     * The data needed to create a CartItem.
     */
    data: XOR<CartItemCreateInput, CartItemUncheckedCreateInput>
  }

  /**
   * CartItem createMany
   */
  export type CartItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CartItems.
     */
    data: CartItemCreateManyInput | CartItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CartItem createManyAndReturn
   */
  export type CartItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CartItem
     */
    omit?: CartItemOmit<ExtArgs> | null
    /**
     * The data used to create many CartItems.
     */
    data: CartItemCreateManyInput | CartItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CartItem update
   */
  export type CartItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartItem
     */
    omit?: CartItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null
    /**
     * The data needed to update a CartItem.
     */
    data: XOR<CartItemUpdateInput, CartItemUncheckedUpdateInput>
    /**
     * Choose, which CartItem to update.
     */
    where: CartItemWhereUniqueInput
  }

  /**
   * CartItem updateMany
   */
  export type CartItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CartItems.
     */
    data: XOR<CartItemUpdateManyMutationInput, CartItemUncheckedUpdateManyInput>
    /**
     * Filter which CartItems to update
     */
    where?: CartItemWhereInput
    /**
     * Limit how many CartItems to update.
     */
    limit?: number
  }

  /**
   * CartItem updateManyAndReturn
   */
  export type CartItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CartItem
     */
    omit?: CartItemOmit<ExtArgs> | null
    /**
     * The data used to update CartItems.
     */
    data: XOR<CartItemUpdateManyMutationInput, CartItemUncheckedUpdateManyInput>
    /**
     * Filter which CartItems to update
     */
    where?: CartItemWhereInput
    /**
     * Limit how many CartItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CartItem upsert
   */
  export type CartItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartItem
     */
    omit?: CartItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null
    /**
     * The filter to search for the CartItem to update in case it exists.
     */
    where: CartItemWhereUniqueInput
    /**
     * In case the CartItem found by the `where` argument doesn't exist, create a new CartItem with this data.
     */
    create: XOR<CartItemCreateInput, CartItemUncheckedCreateInput>
    /**
     * In case the CartItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CartItemUpdateInput, CartItemUncheckedUpdateInput>
  }

  /**
   * CartItem delete
   */
  export type CartItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartItem
     */
    omit?: CartItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null
    /**
     * Filter which CartItem to delete.
     */
    where: CartItemWhereUniqueInput
  }

  /**
   * CartItem deleteMany
   */
  export type CartItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CartItems to delete
     */
    where?: CartItemWhereInput
    /**
     * Limit how many CartItems to delete.
     */
    limit?: number
  }

  /**
   * CartItem.variant
   */
  export type CartItem$variantArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    where?: ProductVariantWhereInput
  }

  /**
   * CartItem without action
   */
  export type CartItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CartItem
     */
    omit?: CartItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null
  }


  /**
   * Model Favorite
   */

  export type AggregateFavorite = {
    _count: FavoriteCountAggregateOutputType | null
    _min: FavoriteMinAggregateOutputType | null
    _max: FavoriteMaxAggregateOutputType | null
  }

  export type FavoriteMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    userId: string | null
    productId: string | null
  }

  export type FavoriteMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    userId: string | null
    productId: string | null
  }

  export type FavoriteCountAggregateOutputType = {
    id: number
    createdAt: number
    userId: number
    productId: number
    _all: number
  }


  export type FavoriteMinAggregateInputType = {
    id?: true
    createdAt?: true
    userId?: true
    productId?: true
  }

  export type FavoriteMaxAggregateInputType = {
    id?: true
    createdAt?: true
    userId?: true
    productId?: true
  }

  export type FavoriteCountAggregateInputType = {
    id?: true
    createdAt?: true
    userId?: true
    productId?: true
    _all?: true
  }

  export type FavoriteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Favorite to aggregate.
     */
    where?: FavoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Favorites to fetch.
     */
    orderBy?: FavoriteOrderByWithRelationInput | FavoriteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FavoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Favorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Favorites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Favorites
    **/
    _count?: true | FavoriteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FavoriteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FavoriteMaxAggregateInputType
  }

  export type GetFavoriteAggregateType<T extends FavoriteAggregateArgs> = {
        [P in keyof T & keyof AggregateFavorite]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFavorite[P]>
      : GetScalarType<T[P], AggregateFavorite[P]>
  }




  export type FavoriteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FavoriteWhereInput
    orderBy?: FavoriteOrderByWithAggregationInput | FavoriteOrderByWithAggregationInput[]
    by: FavoriteScalarFieldEnum[] | FavoriteScalarFieldEnum
    having?: FavoriteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FavoriteCountAggregateInputType | true
    _min?: FavoriteMinAggregateInputType
    _max?: FavoriteMaxAggregateInputType
  }

  export type FavoriteGroupByOutputType = {
    id: string
    createdAt: Date
    userId: string
    productId: string
    _count: FavoriteCountAggregateOutputType | null
    _min: FavoriteMinAggregateOutputType | null
    _max: FavoriteMaxAggregateOutputType | null
  }

  type GetFavoriteGroupByPayload<T extends FavoriteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FavoriteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FavoriteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FavoriteGroupByOutputType[P]>
            : GetScalarType<T[P], FavoriteGroupByOutputType[P]>
        }
      >
    >


  export type FavoriteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    userId?: boolean
    productId?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["favorite"]>

  export type FavoriteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    userId?: boolean
    productId?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["favorite"]>

  export type FavoriteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    userId?: boolean
    productId?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["favorite"]>

  export type FavoriteSelectScalar = {
    id?: boolean
    createdAt?: boolean
    userId?: boolean
    productId?: boolean
  }

  export type FavoriteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "userId" | "productId", ExtArgs["result"]["favorite"]>
  export type FavoriteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FavoriteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FavoriteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $FavoritePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Favorite"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      userId: string
      productId: string
    }, ExtArgs["result"]["favorite"]>
    composites: {}
  }

  type FavoriteGetPayload<S extends boolean | null | undefined | FavoriteDefaultArgs> = $Result.GetResult<Prisma.$FavoritePayload, S>

  type FavoriteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FavoriteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FavoriteCountAggregateInputType | true
    }

  export interface FavoriteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Favorite'], meta: { name: 'Favorite' } }
    /**
     * Find zero or one Favorite that matches the filter.
     * @param {FavoriteFindUniqueArgs} args - Arguments to find a Favorite
     * @example
     * // Get one Favorite
     * const favorite = await prisma.favorite.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FavoriteFindUniqueArgs>(args: SelectSubset<T, FavoriteFindUniqueArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Favorite that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FavoriteFindUniqueOrThrowArgs} args - Arguments to find a Favorite
     * @example
     * // Get one Favorite
     * const favorite = await prisma.favorite.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FavoriteFindUniqueOrThrowArgs>(args: SelectSubset<T, FavoriteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Favorite that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteFindFirstArgs} args - Arguments to find a Favorite
     * @example
     * // Get one Favorite
     * const favorite = await prisma.favorite.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FavoriteFindFirstArgs>(args?: SelectSubset<T, FavoriteFindFirstArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Favorite that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteFindFirstOrThrowArgs} args - Arguments to find a Favorite
     * @example
     * // Get one Favorite
     * const favorite = await prisma.favorite.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FavoriteFindFirstOrThrowArgs>(args?: SelectSubset<T, FavoriteFindFirstOrThrowArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Favorites that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Favorites
     * const favorites = await prisma.favorite.findMany()
     * 
     * // Get first 10 Favorites
     * const favorites = await prisma.favorite.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const favoriteWithIdOnly = await prisma.favorite.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FavoriteFindManyArgs>(args?: SelectSubset<T, FavoriteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Favorite.
     * @param {FavoriteCreateArgs} args - Arguments to create a Favorite.
     * @example
     * // Create one Favorite
     * const Favorite = await prisma.favorite.create({
     *   data: {
     *     // ... data to create a Favorite
     *   }
     * })
     * 
     */
    create<T extends FavoriteCreateArgs>(args: SelectSubset<T, FavoriteCreateArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Favorites.
     * @param {FavoriteCreateManyArgs} args - Arguments to create many Favorites.
     * @example
     * // Create many Favorites
     * const favorite = await prisma.favorite.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FavoriteCreateManyArgs>(args?: SelectSubset<T, FavoriteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Favorites and returns the data saved in the database.
     * @param {FavoriteCreateManyAndReturnArgs} args - Arguments to create many Favorites.
     * @example
     * // Create many Favorites
     * const favorite = await prisma.favorite.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Favorites and only return the `id`
     * const favoriteWithIdOnly = await prisma.favorite.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FavoriteCreateManyAndReturnArgs>(args?: SelectSubset<T, FavoriteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Favorite.
     * @param {FavoriteDeleteArgs} args - Arguments to delete one Favorite.
     * @example
     * // Delete one Favorite
     * const Favorite = await prisma.favorite.delete({
     *   where: {
     *     // ... filter to delete one Favorite
     *   }
     * })
     * 
     */
    delete<T extends FavoriteDeleteArgs>(args: SelectSubset<T, FavoriteDeleteArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Favorite.
     * @param {FavoriteUpdateArgs} args - Arguments to update one Favorite.
     * @example
     * // Update one Favorite
     * const favorite = await prisma.favorite.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FavoriteUpdateArgs>(args: SelectSubset<T, FavoriteUpdateArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Favorites.
     * @param {FavoriteDeleteManyArgs} args - Arguments to filter Favorites to delete.
     * @example
     * // Delete a few Favorites
     * const { count } = await prisma.favorite.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FavoriteDeleteManyArgs>(args?: SelectSubset<T, FavoriteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Favorites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Favorites
     * const favorite = await prisma.favorite.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FavoriteUpdateManyArgs>(args: SelectSubset<T, FavoriteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Favorites and returns the data updated in the database.
     * @param {FavoriteUpdateManyAndReturnArgs} args - Arguments to update many Favorites.
     * @example
     * // Update many Favorites
     * const favorite = await prisma.favorite.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Favorites and only return the `id`
     * const favoriteWithIdOnly = await prisma.favorite.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FavoriteUpdateManyAndReturnArgs>(args: SelectSubset<T, FavoriteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Favorite.
     * @param {FavoriteUpsertArgs} args - Arguments to update or create a Favorite.
     * @example
     * // Update or create a Favorite
     * const favorite = await prisma.favorite.upsert({
     *   create: {
     *     // ... data to create a Favorite
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Favorite we want to update
     *   }
     * })
     */
    upsert<T extends FavoriteUpsertArgs>(args: SelectSubset<T, FavoriteUpsertArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Favorites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteCountArgs} args - Arguments to filter Favorites to count.
     * @example
     * // Count the number of Favorites
     * const count = await prisma.favorite.count({
     *   where: {
     *     // ... the filter for the Favorites we want to count
     *   }
     * })
    **/
    count<T extends FavoriteCountArgs>(
      args?: Subset<T, FavoriteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FavoriteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Favorite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FavoriteAggregateArgs>(args: Subset<T, FavoriteAggregateArgs>): Prisma.PrismaPromise<GetFavoriteAggregateType<T>>

    /**
     * Group by Favorite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FavoriteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FavoriteGroupByArgs['orderBy'] }
        : { orderBy?: FavoriteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FavoriteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFavoriteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Favorite model
   */
  readonly fields: FavoriteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Favorite.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FavoriteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Favorite model
   */
  interface FavoriteFieldRefs {
    readonly id: FieldRef<"Favorite", 'String'>
    readonly createdAt: FieldRef<"Favorite", 'DateTime'>
    readonly userId: FieldRef<"Favorite", 'String'>
    readonly productId: FieldRef<"Favorite", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Favorite findUnique
   */
  export type FavoriteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * Filter, which Favorite to fetch.
     */
    where: FavoriteWhereUniqueInput
  }

  /**
   * Favorite findUniqueOrThrow
   */
  export type FavoriteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * Filter, which Favorite to fetch.
     */
    where: FavoriteWhereUniqueInput
  }

  /**
   * Favorite findFirst
   */
  export type FavoriteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * Filter, which Favorite to fetch.
     */
    where?: FavoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Favorites to fetch.
     */
    orderBy?: FavoriteOrderByWithRelationInput | FavoriteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Favorites.
     */
    cursor?: FavoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Favorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Favorites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Favorites.
     */
    distinct?: FavoriteScalarFieldEnum | FavoriteScalarFieldEnum[]
  }

  /**
   * Favorite findFirstOrThrow
   */
  export type FavoriteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * Filter, which Favorite to fetch.
     */
    where?: FavoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Favorites to fetch.
     */
    orderBy?: FavoriteOrderByWithRelationInput | FavoriteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Favorites.
     */
    cursor?: FavoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Favorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Favorites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Favorites.
     */
    distinct?: FavoriteScalarFieldEnum | FavoriteScalarFieldEnum[]
  }

  /**
   * Favorite findMany
   */
  export type FavoriteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * Filter, which Favorites to fetch.
     */
    where?: FavoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Favorites to fetch.
     */
    orderBy?: FavoriteOrderByWithRelationInput | FavoriteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Favorites.
     */
    cursor?: FavoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Favorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Favorites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Favorites.
     */
    distinct?: FavoriteScalarFieldEnum | FavoriteScalarFieldEnum[]
  }

  /**
   * Favorite create
   */
  export type FavoriteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * The data needed to create a Favorite.
     */
    data: XOR<FavoriteCreateInput, FavoriteUncheckedCreateInput>
  }

  /**
   * Favorite createMany
   */
  export type FavoriteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Favorites.
     */
    data: FavoriteCreateManyInput | FavoriteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Favorite createManyAndReturn
   */
  export type FavoriteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * The data used to create many Favorites.
     */
    data: FavoriteCreateManyInput | FavoriteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Favorite update
   */
  export type FavoriteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * The data needed to update a Favorite.
     */
    data: XOR<FavoriteUpdateInput, FavoriteUncheckedUpdateInput>
    /**
     * Choose, which Favorite to update.
     */
    where: FavoriteWhereUniqueInput
  }

  /**
   * Favorite updateMany
   */
  export type FavoriteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Favorites.
     */
    data: XOR<FavoriteUpdateManyMutationInput, FavoriteUncheckedUpdateManyInput>
    /**
     * Filter which Favorites to update
     */
    where?: FavoriteWhereInput
    /**
     * Limit how many Favorites to update.
     */
    limit?: number
  }

  /**
   * Favorite updateManyAndReturn
   */
  export type FavoriteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * The data used to update Favorites.
     */
    data: XOR<FavoriteUpdateManyMutationInput, FavoriteUncheckedUpdateManyInput>
    /**
     * Filter which Favorites to update
     */
    where?: FavoriteWhereInput
    /**
     * Limit how many Favorites to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Favorite upsert
   */
  export type FavoriteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * The filter to search for the Favorite to update in case it exists.
     */
    where: FavoriteWhereUniqueInput
    /**
     * In case the Favorite found by the `where` argument doesn't exist, create a new Favorite with this data.
     */
    create: XOR<FavoriteCreateInput, FavoriteUncheckedCreateInput>
    /**
     * In case the Favorite was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FavoriteUpdateInput, FavoriteUncheckedUpdateInput>
  }

  /**
   * Favorite delete
   */
  export type FavoriteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * Filter which Favorite to delete.
     */
    where: FavoriteWhereUniqueInput
  }

  /**
   * Favorite deleteMany
   */
  export type FavoriteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Favorites to delete
     */
    where?: FavoriteWhereInput
    /**
     * Limit how many Favorites to delete.
     */
    limit?: number
  }

  /**
   * Favorite without action
   */
  export type FavoriteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
  }


  /**
   * Model Order
   */

  export type AggregateOrder = {
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  export type OrderAvgAggregateOutputType = {
    total: number | null
    fraisLivraison: number | null
  }

  export type OrderSumAggregateOutputType = {
    total: number | null
    fraisLivraison: number | null
  }

  export type OrderMinAggregateOutputType = {
    id: string | null
    statut: $Enums.OrderStatus | null
    total: number | null
    adresse: string | null
    modePaiement: string | null
    methodeExpedition: string | null
    fraisLivraison: number | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    scan1Done: boolean | null
    scan1Result: string | null
    scan1ShippingAllowed: boolean | null
    scan2Done: boolean | null
    scan2Result: string | null
    retourDemande: boolean | null
  }

  export type OrderMaxAggregateOutputType = {
    id: string | null
    statut: $Enums.OrderStatus | null
    total: number | null
    adresse: string | null
    modePaiement: string | null
    methodeExpedition: string | null
    fraisLivraison: number | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    scan1Done: boolean | null
    scan1Result: string | null
    scan1ShippingAllowed: boolean | null
    scan2Done: boolean | null
    scan2Result: string | null
    retourDemande: boolean | null
  }

  export type OrderCountAggregateOutputType = {
    id: number
    statut: number
    total: number
    adresse: number
    modePaiement: number
    methodeExpedition: number
    fraisLivraison: number
    createdAt: number
    updatedAt: number
    userId: number
    scan1Done: number
    scan1Result: number
    scan1ShippingAllowed: number
    scan2Done: number
    scan2Result: number
    retourDemande: number
    _all: number
  }


  export type OrderAvgAggregateInputType = {
    total?: true
    fraisLivraison?: true
  }

  export type OrderSumAggregateInputType = {
    total?: true
    fraisLivraison?: true
  }

  export type OrderMinAggregateInputType = {
    id?: true
    statut?: true
    total?: true
    adresse?: true
    modePaiement?: true
    methodeExpedition?: true
    fraisLivraison?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    scan1Done?: true
    scan1Result?: true
    scan1ShippingAllowed?: true
    scan2Done?: true
    scan2Result?: true
    retourDemande?: true
  }

  export type OrderMaxAggregateInputType = {
    id?: true
    statut?: true
    total?: true
    adresse?: true
    modePaiement?: true
    methodeExpedition?: true
    fraisLivraison?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    scan1Done?: true
    scan1Result?: true
    scan1ShippingAllowed?: true
    scan2Done?: true
    scan2Result?: true
    retourDemande?: true
  }

  export type OrderCountAggregateInputType = {
    id?: true
    statut?: true
    total?: true
    adresse?: true
    modePaiement?: true
    methodeExpedition?: true
    fraisLivraison?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    scan1Done?: true
    scan1Result?: true
    scan1ShippingAllowed?: true
    scan2Done?: true
    scan2Result?: true
    retourDemande?: true
    _all?: true
  }

  export type OrderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Order to aggregate.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Orders
    **/
    _count?: true | OrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderMaxAggregateInputType
  }

  export type GetOrderAggregateType<T extends OrderAggregateArgs> = {
        [P in keyof T & keyof AggregateOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrder[P]>
      : GetScalarType<T[P], AggregateOrder[P]>
  }




  export type OrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithAggregationInput | OrderOrderByWithAggregationInput[]
    by: OrderScalarFieldEnum[] | OrderScalarFieldEnum
    having?: OrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderCountAggregateInputType | true
    _avg?: OrderAvgAggregateInputType
    _sum?: OrderSumAggregateInputType
    _min?: OrderMinAggregateInputType
    _max?: OrderMaxAggregateInputType
  }

  export type OrderGroupByOutputType = {
    id: string
    statut: $Enums.OrderStatus
    total: number
    adresse: string
    modePaiement: string
    methodeExpedition: string
    fraisLivraison: number
    createdAt: Date
    updatedAt: Date
    userId: string
    scan1Done: boolean
    scan1Result: string | null
    scan1ShippingAllowed: boolean
    scan2Done: boolean
    scan2Result: string | null
    retourDemande: boolean
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  type GetOrderGroupByPayload<T extends OrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderGroupByOutputType[P]>
            : GetScalarType<T[P], OrderGroupByOutputType[P]>
        }
      >
    >


  export type OrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    statut?: boolean
    total?: boolean
    adresse?: boolean
    modePaiement?: boolean
    methodeExpedition?: boolean
    fraisLivraison?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    scan1Done?: boolean
    scan1Result?: boolean
    scan1ShippingAllowed?: boolean
    scan2Done?: boolean
    scan2Result?: boolean
    retourDemande?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    items?: boolean | Order$itemsArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    statut?: boolean
    total?: boolean
    adresse?: boolean
    modePaiement?: boolean
    methodeExpedition?: boolean
    fraisLivraison?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    scan1Done?: boolean
    scan1Result?: boolean
    scan1ShippingAllowed?: boolean
    scan2Done?: boolean
    scan2Result?: boolean
    retourDemande?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    statut?: boolean
    total?: boolean
    adresse?: boolean
    modePaiement?: boolean
    methodeExpedition?: boolean
    fraisLivraison?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    scan1Done?: boolean
    scan1Result?: boolean
    scan1ShippingAllowed?: boolean
    scan2Done?: boolean
    scan2Result?: boolean
    retourDemande?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectScalar = {
    id?: boolean
    statut?: boolean
    total?: boolean
    adresse?: boolean
    modePaiement?: boolean
    methodeExpedition?: boolean
    fraisLivraison?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    scan1Done?: boolean
    scan1Result?: boolean
    scan1ShippingAllowed?: boolean
    scan2Done?: boolean
    scan2Result?: boolean
    retourDemande?: boolean
  }

  export type OrderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "statut" | "total" | "adresse" | "modePaiement" | "methodeExpedition" | "fraisLivraison" | "createdAt" | "updatedAt" | "userId" | "scan1Done" | "scan1Result" | "scan1ShippingAllowed" | "scan2Done" | "scan2Result" | "retourDemande", ExtArgs["result"]["order"]>
  export type OrderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    items?: boolean | Order$itemsArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OrderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type OrderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $OrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Order"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      items: Prisma.$OrderItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      statut: $Enums.OrderStatus
      total: number
      adresse: string
      modePaiement: string
      methodeExpedition: string
      fraisLivraison: number
      createdAt: Date
      updatedAt: Date
      userId: string
      scan1Done: boolean
      scan1Result: string | null
      scan1ShippingAllowed: boolean
      scan2Done: boolean
      scan2Result: string | null
      retourDemande: boolean
    }, ExtArgs["result"]["order"]>
    composites: {}
  }

  type OrderGetPayload<S extends boolean | null | undefined | OrderDefaultArgs> = $Result.GetResult<Prisma.$OrderPayload, S>

  type OrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderCountAggregateInputType | true
    }

  export interface OrderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Order'], meta: { name: 'Order' } }
    /**
     * Find zero or one Order that matches the filter.
     * @param {OrderFindUniqueArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderFindUniqueArgs>(args: SelectSubset<T, OrderFindUniqueArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Order that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderFindUniqueOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderFindFirstArgs>(args?: SelectSubset<T, OrderFindFirstArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Orders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Orders
     * const orders = await prisma.order.findMany()
     * 
     * // Get first 10 Orders
     * const orders = await prisma.order.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderWithIdOnly = await prisma.order.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderFindManyArgs>(args?: SelectSubset<T, OrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Order.
     * @param {OrderCreateArgs} args - Arguments to create a Order.
     * @example
     * // Create one Order
     * const Order = await prisma.order.create({
     *   data: {
     *     // ... data to create a Order
     *   }
     * })
     * 
     */
    create<T extends OrderCreateArgs>(args: SelectSubset<T, OrderCreateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Orders.
     * @param {OrderCreateManyArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderCreateManyArgs>(args?: SelectSubset<T, OrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Orders and returns the data saved in the database.
     * @param {OrderCreateManyAndReturnArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Order.
     * @param {OrderDeleteArgs} args - Arguments to delete one Order.
     * @example
     * // Delete one Order
     * const Order = await prisma.order.delete({
     *   where: {
     *     // ... filter to delete one Order
     *   }
     * })
     * 
     */
    delete<T extends OrderDeleteArgs>(args: SelectSubset<T, OrderDeleteArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Order.
     * @param {OrderUpdateArgs} args - Arguments to update one Order.
     * @example
     * // Update one Order
     * const order = await prisma.order.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderUpdateArgs>(args: SelectSubset<T, OrderUpdateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Orders.
     * @param {OrderDeleteManyArgs} args - Arguments to filter Orders to delete.
     * @example
     * // Delete a few Orders
     * const { count } = await prisma.order.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderDeleteManyArgs>(args?: SelectSubset<T, OrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderUpdateManyArgs>(args: SelectSubset<T, OrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders and returns the data updated in the database.
     * @param {OrderUpdateManyAndReturnArgs} args - Arguments to update many Orders.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrderUpdateManyAndReturnArgs>(args: SelectSubset<T, OrderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Order.
     * @param {OrderUpsertArgs} args - Arguments to update or create a Order.
     * @example
     * // Update or create a Order
     * const order = await prisma.order.upsert({
     *   create: {
     *     // ... data to create a Order
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Order we want to update
     *   }
     * })
     */
    upsert<T extends OrderUpsertArgs>(args: SelectSubset<T, OrderUpsertArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderCountArgs} args - Arguments to filter Orders to count.
     * @example
     * // Count the number of Orders
     * const count = await prisma.order.count({
     *   where: {
     *     // ... the filter for the Orders we want to count
     *   }
     * })
    **/
    count<T extends OrderCountArgs>(
      args?: Subset<T, OrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderAggregateArgs>(args: Subset<T, OrderAggregateArgs>): Prisma.PrismaPromise<GetOrderAggregateType<T>>

    /**
     * Group by Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderGroupByArgs['orderBy'] }
        : { orderBy?: OrderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Order model
   */
  readonly fields: OrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Order.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    items<T extends Order$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Order$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Order model
   */
  interface OrderFieldRefs {
    readonly id: FieldRef<"Order", 'String'>
    readonly statut: FieldRef<"Order", 'OrderStatus'>
    readonly total: FieldRef<"Order", 'Float'>
    readonly adresse: FieldRef<"Order", 'String'>
    readonly modePaiement: FieldRef<"Order", 'String'>
    readonly methodeExpedition: FieldRef<"Order", 'String'>
    readonly fraisLivraison: FieldRef<"Order", 'Float'>
    readonly createdAt: FieldRef<"Order", 'DateTime'>
    readonly updatedAt: FieldRef<"Order", 'DateTime'>
    readonly userId: FieldRef<"Order", 'String'>
    readonly scan1Done: FieldRef<"Order", 'Boolean'>
    readonly scan1Result: FieldRef<"Order", 'String'>
    readonly scan1ShippingAllowed: FieldRef<"Order", 'Boolean'>
    readonly scan2Done: FieldRef<"Order", 'Boolean'>
    readonly scan2Result: FieldRef<"Order", 'String'>
    readonly retourDemande: FieldRef<"Order", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Order findUnique
   */
  export type OrderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findUniqueOrThrow
   */
  export type OrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findFirst
   */
  export type OrderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findFirstOrThrow
   */
  export type OrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findMany
   */
  export type OrderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Orders to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order create
   */
  export type OrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to create a Order.
     */
    data: XOR<OrderCreateInput, OrderUncheckedCreateInput>
  }

  /**
   * Order createMany
   */
  export type OrderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Order createManyAndReturn
   */
  export type OrderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Order update
   */
  export type OrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to update a Order.
     */
    data: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
    /**
     * Choose, which Order to update.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order updateMany
   */
  export type OrderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
  }

  /**
   * Order updateManyAndReturn
   */
  export type OrderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Order upsert
   */
  export type OrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The filter to search for the Order to update in case it exists.
     */
    where: OrderWhereUniqueInput
    /**
     * In case the Order found by the `where` argument doesn't exist, create a new Order with this data.
     */
    create: XOR<OrderCreateInput, OrderUncheckedCreateInput>
    /**
     * In case the Order was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
  }

  /**
   * Order delete
   */
  export type OrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter which Order to delete.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order deleteMany
   */
  export type OrderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Orders to delete
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to delete.
     */
    limit?: number
  }

  /**
   * Order.items
   */
  export type Order$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    cursor?: OrderItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * Order without action
   */
  export type OrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
  }


  /**
   * Model OrderItem
   */

  export type AggregateOrderItem = {
    _count: OrderItemCountAggregateOutputType | null
    _avg: OrderItemAvgAggregateOutputType | null
    _sum: OrderItemSumAggregateOutputType | null
    _min: OrderItemMinAggregateOutputType | null
    _max: OrderItemMaxAggregateOutputType | null
  }

  export type OrderItemAvgAggregateOutputType = {
    quantite: number | null
    prix: number | null
  }

  export type OrderItemSumAggregateOutputType = {
    quantite: number | null
    prix: number | null
  }

  export type OrderItemMinAggregateOutputType = {
    id: string | null
    quantite: number | null
    prix: number | null
    orderId: string | null
    productId: string | null
    variantId: string | null
    variantNom: string | null
  }

  export type OrderItemMaxAggregateOutputType = {
    id: string | null
    quantite: number | null
    prix: number | null
    orderId: string | null
    productId: string | null
    variantId: string | null
    variantNom: string | null
  }

  export type OrderItemCountAggregateOutputType = {
    id: number
    quantite: number
    prix: number
    orderId: number
    productId: number
    variantId: number
    variantNom: number
    _all: number
  }


  export type OrderItemAvgAggregateInputType = {
    quantite?: true
    prix?: true
  }

  export type OrderItemSumAggregateInputType = {
    quantite?: true
    prix?: true
  }

  export type OrderItemMinAggregateInputType = {
    id?: true
    quantite?: true
    prix?: true
    orderId?: true
    productId?: true
    variantId?: true
    variantNom?: true
  }

  export type OrderItemMaxAggregateInputType = {
    id?: true
    quantite?: true
    prix?: true
    orderId?: true
    productId?: true
    variantId?: true
    variantNom?: true
  }

  export type OrderItemCountAggregateInputType = {
    id?: true
    quantite?: true
    prix?: true
    orderId?: true
    productId?: true
    variantId?: true
    variantNom?: true
    _all?: true
  }

  export type OrderItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderItem to aggregate.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrderItems
    **/
    _count?: true | OrderItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderItemMaxAggregateInputType
  }

  export type GetOrderItemAggregateType<T extends OrderItemAggregateArgs> = {
        [P in keyof T & keyof AggregateOrderItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrderItem[P]>
      : GetScalarType<T[P], AggregateOrderItem[P]>
  }




  export type OrderItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithAggregationInput | OrderItemOrderByWithAggregationInput[]
    by: OrderItemScalarFieldEnum[] | OrderItemScalarFieldEnum
    having?: OrderItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderItemCountAggregateInputType | true
    _avg?: OrderItemAvgAggregateInputType
    _sum?: OrderItemSumAggregateInputType
    _min?: OrderItemMinAggregateInputType
    _max?: OrderItemMaxAggregateInputType
  }

  export type OrderItemGroupByOutputType = {
    id: string
    quantite: number
    prix: number
    orderId: string
    productId: string
    variantId: string | null
    variantNom: string | null
    _count: OrderItemCountAggregateOutputType | null
    _avg: OrderItemAvgAggregateOutputType | null
    _sum: OrderItemSumAggregateOutputType | null
    _min: OrderItemMinAggregateOutputType | null
    _max: OrderItemMaxAggregateOutputType | null
  }

  type GetOrderItemGroupByPayload<T extends OrderItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderItemGroupByOutputType[P]>
            : GetScalarType<T[P], OrderItemGroupByOutputType[P]>
        }
      >
    >


  export type OrderItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    quantite?: boolean
    prix?: boolean
    orderId?: boolean
    productId?: boolean
    variantId?: boolean
    variantNom?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
    variant?: boolean | OrderItem$variantArgs<ExtArgs>
  }, ExtArgs["result"]["orderItem"]>

  export type OrderItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    quantite?: boolean
    prix?: boolean
    orderId?: boolean
    productId?: boolean
    variantId?: boolean
    variantNom?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
    variant?: boolean | OrderItem$variantArgs<ExtArgs>
  }, ExtArgs["result"]["orderItem"]>

  export type OrderItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    quantite?: boolean
    prix?: boolean
    orderId?: boolean
    productId?: boolean
    variantId?: boolean
    variantNom?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
    variant?: boolean | OrderItem$variantArgs<ExtArgs>
  }, ExtArgs["result"]["orderItem"]>

  export type OrderItemSelectScalar = {
    id?: boolean
    quantite?: boolean
    prix?: boolean
    orderId?: boolean
    productId?: boolean
    variantId?: boolean
    variantNom?: boolean
  }

  export type OrderItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "quantite" | "prix" | "orderId" | "productId" | "variantId" | "variantNom", ExtArgs["result"]["orderItem"]>
  export type OrderItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
    variant?: boolean | OrderItem$variantArgs<ExtArgs>
  }
  export type OrderItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
    variant?: boolean | OrderItem$variantArgs<ExtArgs>
  }
  export type OrderItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
    variant?: boolean | OrderItem$variantArgs<ExtArgs>
  }

  export type $OrderItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrderItem"
    objects: {
      order: Prisma.$OrderPayload<ExtArgs>
      product: Prisma.$ProductPayload<ExtArgs>
      variant: Prisma.$ProductVariantPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      quantite: number
      prix: number
      orderId: string
      productId: string
      variantId: string | null
      variantNom: string | null
    }, ExtArgs["result"]["orderItem"]>
    composites: {}
  }

  type OrderItemGetPayload<S extends boolean | null | undefined | OrderItemDefaultArgs> = $Result.GetResult<Prisma.$OrderItemPayload, S>

  type OrderItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderItemCountAggregateInputType | true
    }

  export interface OrderItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrderItem'], meta: { name: 'OrderItem' } }
    /**
     * Find zero or one OrderItem that matches the filter.
     * @param {OrderItemFindUniqueArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderItemFindUniqueArgs>(args: SelectSubset<T, OrderItemFindUniqueArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OrderItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderItemFindUniqueOrThrowArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderItemFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindFirstArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderItemFindFirstArgs>(args?: SelectSubset<T, OrderItemFindFirstArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindFirstOrThrowArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderItemFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OrderItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrderItems
     * const orderItems = await prisma.orderItem.findMany()
     * 
     * // Get first 10 OrderItems
     * const orderItems = await prisma.orderItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderItemFindManyArgs>(args?: SelectSubset<T, OrderItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OrderItem.
     * @param {OrderItemCreateArgs} args - Arguments to create a OrderItem.
     * @example
     * // Create one OrderItem
     * const OrderItem = await prisma.orderItem.create({
     *   data: {
     *     // ... data to create a OrderItem
     *   }
     * })
     * 
     */
    create<T extends OrderItemCreateArgs>(args: SelectSubset<T, OrderItemCreateArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OrderItems.
     * @param {OrderItemCreateManyArgs} args - Arguments to create many OrderItems.
     * @example
     * // Create many OrderItems
     * const orderItem = await prisma.orderItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderItemCreateManyArgs>(args?: SelectSubset<T, OrderItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OrderItems and returns the data saved in the database.
     * @param {OrderItemCreateManyAndReturnArgs} args - Arguments to create many OrderItems.
     * @example
     * // Create many OrderItems
     * const orderItem = await prisma.orderItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OrderItems and only return the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderItemCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OrderItem.
     * @param {OrderItemDeleteArgs} args - Arguments to delete one OrderItem.
     * @example
     * // Delete one OrderItem
     * const OrderItem = await prisma.orderItem.delete({
     *   where: {
     *     // ... filter to delete one OrderItem
     *   }
     * })
     * 
     */
    delete<T extends OrderItemDeleteArgs>(args: SelectSubset<T, OrderItemDeleteArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OrderItem.
     * @param {OrderItemUpdateArgs} args - Arguments to update one OrderItem.
     * @example
     * // Update one OrderItem
     * const orderItem = await prisma.orderItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderItemUpdateArgs>(args: SelectSubset<T, OrderItemUpdateArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OrderItems.
     * @param {OrderItemDeleteManyArgs} args - Arguments to filter OrderItems to delete.
     * @example
     * // Delete a few OrderItems
     * const { count } = await prisma.orderItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderItemDeleteManyArgs>(args?: SelectSubset<T, OrderItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrderItems
     * const orderItem = await prisma.orderItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderItemUpdateManyArgs>(args: SelectSubset<T, OrderItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderItems and returns the data updated in the database.
     * @param {OrderItemUpdateManyAndReturnArgs} args - Arguments to update many OrderItems.
     * @example
     * // Update many OrderItems
     * const orderItem = await prisma.orderItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OrderItems and only return the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrderItemUpdateManyAndReturnArgs>(args: SelectSubset<T, OrderItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OrderItem.
     * @param {OrderItemUpsertArgs} args - Arguments to update or create a OrderItem.
     * @example
     * // Update or create a OrderItem
     * const orderItem = await prisma.orderItem.upsert({
     *   create: {
     *     // ... data to create a OrderItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrderItem we want to update
     *   }
     * })
     */
    upsert<T extends OrderItemUpsertArgs>(args: SelectSubset<T, OrderItemUpsertArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemCountArgs} args - Arguments to filter OrderItems to count.
     * @example
     * // Count the number of OrderItems
     * const count = await prisma.orderItem.count({
     *   where: {
     *     // ... the filter for the OrderItems we want to count
     *   }
     * })
    **/
    count<T extends OrderItemCountArgs>(
      args?: Subset<T, OrderItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderItemAggregateArgs>(args: Subset<T, OrderItemAggregateArgs>): Prisma.PrismaPromise<GetOrderItemAggregateType<T>>

    /**
     * Group by OrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderItemGroupByArgs['orderBy'] }
        : { orderBy?: OrderItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrderItem model
   */
  readonly fields: OrderItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrderItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderDefaultArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    variant<T extends OrderItem$variantArgs<ExtArgs> = {}>(args?: Subset<T, OrderItem$variantArgs<ExtArgs>>): Prisma__ProductVariantClient<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OrderItem model
   */
  interface OrderItemFieldRefs {
    readonly id: FieldRef<"OrderItem", 'String'>
    readonly quantite: FieldRef<"OrderItem", 'Int'>
    readonly prix: FieldRef<"OrderItem", 'Float'>
    readonly orderId: FieldRef<"OrderItem", 'String'>
    readonly productId: FieldRef<"OrderItem", 'String'>
    readonly variantId: FieldRef<"OrderItem", 'String'>
    readonly variantNom: FieldRef<"OrderItem", 'String'>
  }
    

  // Custom InputTypes
  /**
   * OrderItem findUnique
   */
  export type OrderItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem findUniqueOrThrow
   */
  export type OrderItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem findFirst
   */
  export type OrderItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem findFirstOrThrow
   */
  export type OrderItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem findMany
   */
  export type OrderItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItems to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem create
   */
  export type OrderItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The data needed to create a OrderItem.
     */
    data: XOR<OrderItemCreateInput, OrderItemUncheckedCreateInput>
  }

  /**
   * OrderItem createMany
   */
  export type OrderItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrderItems.
     */
    data: OrderItemCreateManyInput | OrderItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrderItem createManyAndReturn
   */
  export type OrderItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * The data used to create many OrderItems.
     */
    data: OrderItemCreateManyInput | OrderItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrderItem update
   */
  export type OrderItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The data needed to update a OrderItem.
     */
    data: XOR<OrderItemUpdateInput, OrderItemUncheckedUpdateInput>
    /**
     * Choose, which OrderItem to update.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem updateMany
   */
  export type OrderItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrderItems.
     */
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyInput>
    /**
     * Filter which OrderItems to update
     */
    where?: OrderItemWhereInput
    /**
     * Limit how many OrderItems to update.
     */
    limit?: number
  }

  /**
   * OrderItem updateManyAndReturn
   */
  export type OrderItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * The data used to update OrderItems.
     */
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyInput>
    /**
     * Filter which OrderItems to update
     */
    where?: OrderItemWhereInput
    /**
     * Limit how many OrderItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrderItem upsert
   */
  export type OrderItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The filter to search for the OrderItem to update in case it exists.
     */
    where: OrderItemWhereUniqueInput
    /**
     * In case the OrderItem found by the `where` argument doesn't exist, create a new OrderItem with this data.
     */
    create: XOR<OrderItemCreateInput, OrderItemUncheckedCreateInput>
    /**
     * In case the OrderItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderItemUpdateInput, OrderItemUncheckedUpdateInput>
  }

  /**
   * OrderItem delete
   */
  export type OrderItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter which OrderItem to delete.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem deleteMany
   */
  export type OrderItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderItems to delete
     */
    where?: OrderItemWhereInput
    /**
     * Limit how many OrderItems to delete.
     */
    limit?: number
  }

  /**
   * OrderItem.variant
   */
  export type OrderItem$variantArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    where?: ProductVariantWhereInput
  }

  /**
   * OrderItem without action
   */
  export type OrderItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
  }


  /**
   * Model ResetToken
   */

  export type AggregateResetToken = {
    _count: ResetTokenCountAggregateOutputType | null
    _min: ResetTokenMinAggregateOutputType | null
    _max: ResetTokenMaxAggregateOutputType | null
  }

  export type ResetTokenMinAggregateOutputType = {
    id: string | null
    token: string | null
    userId: string | null
    expiresAt: Date | null
    used: boolean | null
    createdAt: Date | null
    verified: boolean | null
    code: string | null
  }

  export type ResetTokenMaxAggregateOutputType = {
    id: string | null
    token: string | null
    userId: string | null
    expiresAt: Date | null
    used: boolean | null
    createdAt: Date | null
    verified: boolean | null
    code: string | null
  }

  export type ResetTokenCountAggregateOutputType = {
    id: number
    token: number
    userId: number
    expiresAt: number
    used: number
    createdAt: number
    verified: number
    code: number
    _all: number
  }


  export type ResetTokenMinAggregateInputType = {
    id?: true
    token?: true
    userId?: true
    expiresAt?: true
    used?: true
    createdAt?: true
    verified?: true
    code?: true
  }

  export type ResetTokenMaxAggregateInputType = {
    id?: true
    token?: true
    userId?: true
    expiresAt?: true
    used?: true
    createdAt?: true
    verified?: true
    code?: true
  }

  export type ResetTokenCountAggregateInputType = {
    id?: true
    token?: true
    userId?: true
    expiresAt?: true
    used?: true
    createdAt?: true
    verified?: true
    code?: true
    _all?: true
  }

  export type ResetTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ResetToken to aggregate.
     */
    where?: ResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResetTokens to fetch.
     */
    orderBy?: ResetTokenOrderByWithRelationInput | ResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ResetTokens
    **/
    _count?: true | ResetTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ResetTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ResetTokenMaxAggregateInputType
  }

  export type GetResetTokenAggregateType<T extends ResetTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateResetToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateResetToken[P]>
      : GetScalarType<T[P], AggregateResetToken[P]>
  }




  export type ResetTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResetTokenWhereInput
    orderBy?: ResetTokenOrderByWithAggregationInput | ResetTokenOrderByWithAggregationInput[]
    by: ResetTokenScalarFieldEnum[] | ResetTokenScalarFieldEnum
    having?: ResetTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ResetTokenCountAggregateInputType | true
    _min?: ResetTokenMinAggregateInputType
    _max?: ResetTokenMaxAggregateInputType
  }

  export type ResetTokenGroupByOutputType = {
    id: string
    token: string
    userId: string
    expiresAt: Date
    used: boolean
    createdAt: Date
    verified: boolean
    code: string
    _count: ResetTokenCountAggregateOutputType | null
    _min: ResetTokenMinAggregateOutputType | null
    _max: ResetTokenMaxAggregateOutputType | null
  }

  type GetResetTokenGroupByPayload<T extends ResetTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ResetTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ResetTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ResetTokenGroupByOutputType[P]>
            : GetScalarType<T[P], ResetTokenGroupByOutputType[P]>
        }
      >
    >


  export type ResetTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    userId?: boolean
    expiresAt?: boolean
    used?: boolean
    createdAt?: boolean
    verified?: boolean
    code?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resetToken"]>

  export type ResetTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    userId?: boolean
    expiresAt?: boolean
    used?: boolean
    createdAt?: boolean
    verified?: boolean
    code?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resetToken"]>

  export type ResetTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    userId?: boolean
    expiresAt?: boolean
    used?: boolean
    createdAt?: boolean
    verified?: boolean
    code?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resetToken"]>

  export type ResetTokenSelectScalar = {
    id?: boolean
    token?: boolean
    userId?: boolean
    expiresAt?: boolean
    used?: boolean
    createdAt?: boolean
    verified?: boolean
    code?: boolean
  }

  export type ResetTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "token" | "userId" | "expiresAt" | "used" | "createdAt" | "verified" | "code", ExtArgs["result"]["resetToken"]>
  export type ResetTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ResetTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ResetTokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ResetTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ResetToken"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      token: string
      userId: string
      expiresAt: Date
      used: boolean
      createdAt: Date
      verified: boolean
      code: string
    }, ExtArgs["result"]["resetToken"]>
    composites: {}
  }

  type ResetTokenGetPayload<S extends boolean | null | undefined | ResetTokenDefaultArgs> = $Result.GetResult<Prisma.$ResetTokenPayload, S>

  type ResetTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ResetTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ResetTokenCountAggregateInputType | true
    }

  export interface ResetTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ResetToken'], meta: { name: 'ResetToken' } }
    /**
     * Find zero or one ResetToken that matches the filter.
     * @param {ResetTokenFindUniqueArgs} args - Arguments to find a ResetToken
     * @example
     * // Get one ResetToken
     * const resetToken = await prisma.resetToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResetTokenFindUniqueArgs>(args: SelectSubset<T, ResetTokenFindUniqueArgs<ExtArgs>>): Prisma__ResetTokenClient<$Result.GetResult<Prisma.$ResetTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ResetToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ResetTokenFindUniqueOrThrowArgs} args - Arguments to find a ResetToken
     * @example
     * // Get one ResetToken
     * const resetToken = await prisma.resetToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResetTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, ResetTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ResetTokenClient<$Result.GetResult<Prisma.$ResetTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ResetToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResetTokenFindFirstArgs} args - Arguments to find a ResetToken
     * @example
     * // Get one ResetToken
     * const resetToken = await prisma.resetToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResetTokenFindFirstArgs>(args?: SelectSubset<T, ResetTokenFindFirstArgs<ExtArgs>>): Prisma__ResetTokenClient<$Result.GetResult<Prisma.$ResetTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ResetToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResetTokenFindFirstOrThrowArgs} args - Arguments to find a ResetToken
     * @example
     * // Get one ResetToken
     * const resetToken = await prisma.resetToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResetTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, ResetTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__ResetTokenClient<$Result.GetResult<Prisma.$ResetTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ResetTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResetTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ResetTokens
     * const resetTokens = await prisma.resetToken.findMany()
     * 
     * // Get first 10 ResetTokens
     * const resetTokens = await prisma.resetToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const resetTokenWithIdOnly = await prisma.resetToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ResetTokenFindManyArgs>(args?: SelectSubset<T, ResetTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResetTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ResetToken.
     * @param {ResetTokenCreateArgs} args - Arguments to create a ResetToken.
     * @example
     * // Create one ResetToken
     * const ResetToken = await prisma.resetToken.create({
     *   data: {
     *     // ... data to create a ResetToken
     *   }
     * })
     * 
     */
    create<T extends ResetTokenCreateArgs>(args: SelectSubset<T, ResetTokenCreateArgs<ExtArgs>>): Prisma__ResetTokenClient<$Result.GetResult<Prisma.$ResetTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ResetTokens.
     * @param {ResetTokenCreateManyArgs} args - Arguments to create many ResetTokens.
     * @example
     * // Create many ResetTokens
     * const resetToken = await prisma.resetToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ResetTokenCreateManyArgs>(args?: SelectSubset<T, ResetTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ResetTokens and returns the data saved in the database.
     * @param {ResetTokenCreateManyAndReturnArgs} args - Arguments to create many ResetTokens.
     * @example
     * // Create many ResetTokens
     * const resetToken = await prisma.resetToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ResetTokens and only return the `id`
     * const resetTokenWithIdOnly = await prisma.resetToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ResetTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, ResetTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResetTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ResetToken.
     * @param {ResetTokenDeleteArgs} args - Arguments to delete one ResetToken.
     * @example
     * // Delete one ResetToken
     * const ResetToken = await prisma.resetToken.delete({
     *   where: {
     *     // ... filter to delete one ResetToken
     *   }
     * })
     * 
     */
    delete<T extends ResetTokenDeleteArgs>(args: SelectSubset<T, ResetTokenDeleteArgs<ExtArgs>>): Prisma__ResetTokenClient<$Result.GetResult<Prisma.$ResetTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ResetToken.
     * @param {ResetTokenUpdateArgs} args - Arguments to update one ResetToken.
     * @example
     * // Update one ResetToken
     * const resetToken = await prisma.resetToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ResetTokenUpdateArgs>(args: SelectSubset<T, ResetTokenUpdateArgs<ExtArgs>>): Prisma__ResetTokenClient<$Result.GetResult<Prisma.$ResetTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ResetTokens.
     * @param {ResetTokenDeleteManyArgs} args - Arguments to filter ResetTokens to delete.
     * @example
     * // Delete a few ResetTokens
     * const { count } = await prisma.resetToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ResetTokenDeleteManyArgs>(args?: SelectSubset<T, ResetTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ResetTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResetTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ResetTokens
     * const resetToken = await prisma.resetToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ResetTokenUpdateManyArgs>(args: SelectSubset<T, ResetTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ResetTokens and returns the data updated in the database.
     * @param {ResetTokenUpdateManyAndReturnArgs} args - Arguments to update many ResetTokens.
     * @example
     * // Update many ResetTokens
     * const resetToken = await prisma.resetToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ResetTokens and only return the `id`
     * const resetTokenWithIdOnly = await prisma.resetToken.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ResetTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, ResetTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResetTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ResetToken.
     * @param {ResetTokenUpsertArgs} args - Arguments to update or create a ResetToken.
     * @example
     * // Update or create a ResetToken
     * const resetToken = await prisma.resetToken.upsert({
     *   create: {
     *     // ... data to create a ResetToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ResetToken we want to update
     *   }
     * })
     */
    upsert<T extends ResetTokenUpsertArgs>(args: SelectSubset<T, ResetTokenUpsertArgs<ExtArgs>>): Prisma__ResetTokenClient<$Result.GetResult<Prisma.$ResetTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ResetTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResetTokenCountArgs} args - Arguments to filter ResetTokens to count.
     * @example
     * // Count the number of ResetTokens
     * const count = await prisma.resetToken.count({
     *   where: {
     *     // ... the filter for the ResetTokens we want to count
     *   }
     * })
    **/
    count<T extends ResetTokenCountArgs>(
      args?: Subset<T, ResetTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ResetTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ResetToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResetTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ResetTokenAggregateArgs>(args: Subset<T, ResetTokenAggregateArgs>): Prisma.PrismaPromise<GetResetTokenAggregateType<T>>

    /**
     * Group by ResetToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResetTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ResetTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ResetTokenGroupByArgs['orderBy'] }
        : { orderBy?: ResetTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ResetTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResetTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ResetToken model
   */
  readonly fields: ResetTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ResetToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ResetTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ResetToken model
   */
  interface ResetTokenFieldRefs {
    readonly id: FieldRef<"ResetToken", 'String'>
    readonly token: FieldRef<"ResetToken", 'String'>
    readonly userId: FieldRef<"ResetToken", 'String'>
    readonly expiresAt: FieldRef<"ResetToken", 'DateTime'>
    readonly used: FieldRef<"ResetToken", 'Boolean'>
    readonly createdAt: FieldRef<"ResetToken", 'DateTime'>
    readonly verified: FieldRef<"ResetToken", 'Boolean'>
    readonly code: FieldRef<"ResetToken", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ResetToken findUnique
   */
  export type ResetTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResetToken
     */
    select?: ResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResetToken
     */
    omit?: ResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which ResetToken to fetch.
     */
    where: ResetTokenWhereUniqueInput
  }

  /**
   * ResetToken findUniqueOrThrow
   */
  export type ResetTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResetToken
     */
    select?: ResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResetToken
     */
    omit?: ResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which ResetToken to fetch.
     */
    where: ResetTokenWhereUniqueInput
  }

  /**
   * ResetToken findFirst
   */
  export type ResetTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResetToken
     */
    select?: ResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResetToken
     */
    omit?: ResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which ResetToken to fetch.
     */
    where?: ResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResetTokens to fetch.
     */
    orderBy?: ResetTokenOrderByWithRelationInput | ResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ResetTokens.
     */
    cursor?: ResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ResetTokens.
     */
    distinct?: ResetTokenScalarFieldEnum | ResetTokenScalarFieldEnum[]
  }

  /**
   * ResetToken findFirstOrThrow
   */
  export type ResetTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResetToken
     */
    select?: ResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResetToken
     */
    omit?: ResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which ResetToken to fetch.
     */
    where?: ResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResetTokens to fetch.
     */
    orderBy?: ResetTokenOrderByWithRelationInput | ResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ResetTokens.
     */
    cursor?: ResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ResetTokens.
     */
    distinct?: ResetTokenScalarFieldEnum | ResetTokenScalarFieldEnum[]
  }

  /**
   * ResetToken findMany
   */
  export type ResetTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResetToken
     */
    select?: ResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResetToken
     */
    omit?: ResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which ResetTokens to fetch.
     */
    where?: ResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResetTokens to fetch.
     */
    orderBy?: ResetTokenOrderByWithRelationInput | ResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ResetTokens.
     */
    cursor?: ResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ResetTokens.
     */
    distinct?: ResetTokenScalarFieldEnum | ResetTokenScalarFieldEnum[]
  }

  /**
   * ResetToken create
   */
  export type ResetTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResetToken
     */
    select?: ResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResetToken
     */
    omit?: ResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResetTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a ResetToken.
     */
    data: XOR<ResetTokenCreateInput, ResetTokenUncheckedCreateInput>
  }

  /**
   * ResetToken createMany
   */
  export type ResetTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ResetTokens.
     */
    data: ResetTokenCreateManyInput | ResetTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ResetToken createManyAndReturn
   */
  export type ResetTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResetToken
     */
    select?: ResetTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ResetToken
     */
    omit?: ResetTokenOmit<ExtArgs> | null
    /**
     * The data used to create many ResetTokens.
     */
    data: ResetTokenCreateManyInput | ResetTokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResetTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ResetToken update
   */
  export type ResetTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResetToken
     */
    select?: ResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResetToken
     */
    omit?: ResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResetTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a ResetToken.
     */
    data: XOR<ResetTokenUpdateInput, ResetTokenUncheckedUpdateInput>
    /**
     * Choose, which ResetToken to update.
     */
    where: ResetTokenWhereUniqueInput
  }

  /**
   * ResetToken updateMany
   */
  export type ResetTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ResetTokens.
     */
    data: XOR<ResetTokenUpdateManyMutationInput, ResetTokenUncheckedUpdateManyInput>
    /**
     * Filter which ResetTokens to update
     */
    where?: ResetTokenWhereInput
    /**
     * Limit how many ResetTokens to update.
     */
    limit?: number
  }

  /**
   * ResetToken updateManyAndReturn
   */
  export type ResetTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResetToken
     */
    select?: ResetTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ResetToken
     */
    omit?: ResetTokenOmit<ExtArgs> | null
    /**
     * The data used to update ResetTokens.
     */
    data: XOR<ResetTokenUpdateManyMutationInput, ResetTokenUncheckedUpdateManyInput>
    /**
     * Filter which ResetTokens to update
     */
    where?: ResetTokenWhereInput
    /**
     * Limit how many ResetTokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResetTokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ResetToken upsert
   */
  export type ResetTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResetToken
     */
    select?: ResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResetToken
     */
    omit?: ResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResetTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the ResetToken to update in case it exists.
     */
    where: ResetTokenWhereUniqueInput
    /**
     * In case the ResetToken found by the `where` argument doesn't exist, create a new ResetToken with this data.
     */
    create: XOR<ResetTokenCreateInput, ResetTokenUncheckedCreateInput>
    /**
     * In case the ResetToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ResetTokenUpdateInput, ResetTokenUncheckedUpdateInput>
  }

  /**
   * ResetToken delete
   */
  export type ResetTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResetToken
     */
    select?: ResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResetToken
     */
    omit?: ResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResetTokenInclude<ExtArgs> | null
    /**
     * Filter which ResetToken to delete.
     */
    where: ResetTokenWhereUniqueInput
  }

  /**
   * ResetToken deleteMany
   */
  export type ResetTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ResetTokens to delete
     */
    where?: ResetTokenWhereInput
    /**
     * Limit how many ResetTokens to delete.
     */
    limit?: number
  }

  /**
   * ResetToken without action
   */
  export type ResetTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResetToken
     */
    select?: ResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResetToken
     */
    omit?: ResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResetTokenInclude<ExtArgs> | null
  }


  /**
   * Model OtpToken
   */

  export type AggregateOtpToken = {
    _count: OtpTokenCountAggregateOutputType | null
    _min: OtpTokenMinAggregateOutputType | null
    _max: OtpTokenMaxAggregateOutputType | null
  }

  export type OtpTokenMinAggregateOutputType = {
    id: string | null
    identifiant: string | null
    token: string | null
    data: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type OtpTokenMaxAggregateOutputType = {
    id: string | null
    identifiant: string | null
    token: string | null
    data: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type OtpTokenCountAggregateOutputType = {
    id: number
    identifiant: number
    token: number
    data: number
    expiresAt: number
    createdAt: number
    _all: number
  }


  export type OtpTokenMinAggregateInputType = {
    id?: true
    identifiant?: true
    token?: true
    data?: true
    expiresAt?: true
    createdAt?: true
  }

  export type OtpTokenMaxAggregateInputType = {
    id?: true
    identifiant?: true
    token?: true
    data?: true
    expiresAt?: true
    createdAt?: true
  }

  export type OtpTokenCountAggregateInputType = {
    id?: true
    identifiant?: true
    token?: true
    data?: true
    expiresAt?: true
    createdAt?: true
    _all?: true
  }

  export type OtpTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OtpToken to aggregate.
     */
    where?: OtpTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OtpTokens to fetch.
     */
    orderBy?: OtpTokenOrderByWithRelationInput | OtpTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OtpTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OtpTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OtpTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OtpTokens
    **/
    _count?: true | OtpTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OtpTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OtpTokenMaxAggregateInputType
  }

  export type GetOtpTokenAggregateType<T extends OtpTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateOtpToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOtpToken[P]>
      : GetScalarType<T[P], AggregateOtpToken[P]>
  }




  export type OtpTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OtpTokenWhereInput
    orderBy?: OtpTokenOrderByWithAggregationInput | OtpTokenOrderByWithAggregationInput[]
    by: OtpTokenScalarFieldEnum[] | OtpTokenScalarFieldEnum
    having?: OtpTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OtpTokenCountAggregateInputType | true
    _min?: OtpTokenMinAggregateInputType
    _max?: OtpTokenMaxAggregateInputType
  }

  export type OtpTokenGroupByOutputType = {
    id: string
    identifiant: string
    token: string
    data: string
    expiresAt: Date
    createdAt: Date
    _count: OtpTokenCountAggregateOutputType | null
    _min: OtpTokenMinAggregateOutputType | null
    _max: OtpTokenMaxAggregateOutputType | null
  }

  type GetOtpTokenGroupByPayload<T extends OtpTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OtpTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OtpTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OtpTokenGroupByOutputType[P]>
            : GetScalarType<T[P], OtpTokenGroupByOutputType[P]>
        }
      >
    >


  export type OtpTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifiant?: boolean
    token?: boolean
    data?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["otpToken"]>

  export type OtpTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifiant?: boolean
    token?: boolean
    data?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["otpToken"]>

  export type OtpTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifiant?: boolean
    token?: boolean
    data?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["otpToken"]>

  export type OtpTokenSelectScalar = {
    id?: boolean
    identifiant?: boolean
    token?: boolean
    data?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }

  export type OtpTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "identifiant" | "token" | "data" | "expiresAt" | "createdAt", ExtArgs["result"]["otpToken"]>

  export type $OtpTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OtpToken"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      identifiant: string
      token: string
      data: string
      expiresAt: Date
      createdAt: Date
    }, ExtArgs["result"]["otpToken"]>
    composites: {}
  }

  type OtpTokenGetPayload<S extends boolean | null | undefined | OtpTokenDefaultArgs> = $Result.GetResult<Prisma.$OtpTokenPayload, S>

  type OtpTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OtpTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OtpTokenCountAggregateInputType | true
    }

  export interface OtpTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OtpToken'], meta: { name: 'OtpToken' } }
    /**
     * Find zero or one OtpToken that matches the filter.
     * @param {OtpTokenFindUniqueArgs} args - Arguments to find a OtpToken
     * @example
     * // Get one OtpToken
     * const otpToken = await prisma.otpToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OtpTokenFindUniqueArgs>(args: SelectSubset<T, OtpTokenFindUniqueArgs<ExtArgs>>): Prisma__OtpTokenClient<$Result.GetResult<Prisma.$OtpTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OtpToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OtpTokenFindUniqueOrThrowArgs} args - Arguments to find a OtpToken
     * @example
     * // Get one OtpToken
     * const otpToken = await prisma.otpToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OtpTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, OtpTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OtpTokenClient<$Result.GetResult<Prisma.$OtpTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OtpToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpTokenFindFirstArgs} args - Arguments to find a OtpToken
     * @example
     * // Get one OtpToken
     * const otpToken = await prisma.otpToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OtpTokenFindFirstArgs>(args?: SelectSubset<T, OtpTokenFindFirstArgs<ExtArgs>>): Prisma__OtpTokenClient<$Result.GetResult<Prisma.$OtpTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OtpToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpTokenFindFirstOrThrowArgs} args - Arguments to find a OtpToken
     * @example
     * // Get one OtpToken
     * const otpToken = await prisma.otpToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OtpTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, OtpTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__OtpTokenClient<$Result.GetResult<Prisma.$OtpTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OtpTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OtpTokens
     * const otpTokens = await prisma.otpToken.findMany()
     * 
     * // Get first 10 OtpTokens
     * const otpTokens = await prisma.otpToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const otpTokenWithIdOnly = await prisma.otpToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OtpTokenFindManyArgs>(args?: SelectSubset<T, OtpTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OtpTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OtpToken.
     * @param {OtpTokenCreateArgs} args - Arguments to create a OtpToken.
     * @example
     * // Create one OtpToken
     * const OtpToken = await prisma.otpToken.create({
     *   data: {
     *     // ... data to create a OtpToken
     *   }
     * })
     * 
     */
    create<T extends OtpTokenCreateArgs>(args: SelectSubset<T, OtpTokenCreateArgs<ExtArgs>>): Prisma__OtpTokenClient<$Result.GetResult<Prisma.$OtpTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OtpTokens.
     * @param {OtpTokenCreateManyArgs} args - Arguments to create many OtpTokens.
     * @example
     * // Create many OtpTokens
     * const otpToken = await prisma.otpToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OtpTokenCreateManyArgs>(args?: SelectSubset<T, OtpTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OtpTokens and returns the data saved in the database.
     * @param {OtpTokenCreateManyAndReturnArgs} args - Arguments to create many OtpTokens.
     * @example
     * // Create many OtpTokens
     * const otpToken = await prisma.otpToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OtpTokens and only return the `id`
     * const otpTokenWithIdOnly = await prisma.otpToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OtpTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, OtpTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OtpTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OtpToken.
     * @param {OtpTokenDeleteArgs} args - Arguments to delete one OtpToken.
     * @example
     * // Delete one OtpToken
     * const OtpToken = await prisma.otpToken.delete({
     *   where: {
     *     // ... filter to delete one OtpToken
     *   }
     * })
     * 
     */
    delete<T extends OtpTokenDeleteArgs>(args: SelectSubset<T, OtpTokenDeleteArgs<ExtArgs>>): Prisma__OtpTokenClient<$Result.GetResult<Prisma.$OtpTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OtpToken.
     * @param {OtpTokenUpdateArgs} args - Arguments to update one OtpToken.
     * @example
     * // Update one OtpToken
     * const otpToken = await prisma.otpToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OtpTokenUpdateArgs>(args: SelectSubset<T, OtpTokenUpdateArgs<ExtArgs>>): Prisma__OtpTokenClient<$Result.GetResult<Prisma.$OtpTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OtpTokens.
     * @param {OtpTokenDeleteManyArgs} args - Arguments to filter OtpTokens to delete.
     * @example
     * // Delete a few OtpTokens
     * const { count } = await prisma.otpToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OtpTokenDeleteManyArgs>(args?: SelectSubset<T, OtpTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OtpTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OtpTokens
     * const otpToken = await prisma.otpToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OtpTokenUpdateManyArgs>(args: SelectSubset<T, OtpTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OtpTokens and returns the data updated in the database.
     * @param {OtpTokenUpdateManyAndReturnArgs} args - Arguments to update many OtpTokens.
     * @example
     * // Update many OtpTokens
     * const otpToken = await prisma.otpToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OtpTokens and only return the `id`
     * const otpTokenWithIdOnly = await prisma.otpToken.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OtpTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, OtpTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OtpTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OtpToken.
     * @param {OtpTokenUpsertArgs} args - Arguments to update or create a OtpToken.
     * @example
     * // Update or create a OtpToken
     * const otpToken = await prisma.otpToken.upsert({
     *   create: {
     *     // ... data to create a OtpToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OtpToken we want to update
     *   }
     * })
     */
    upsert<T extends OtpTokenUpsertArgs>(args: SelectSubset<T, OtpTokenUpsertArgs<ExtArgs>>): Prisma__OtpTokenClient<$Result.GetResult<Prisma.$OtpTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OtpTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpTokenCountArgs} args - Arguments to filter OtpTokens to count.
     * @example
     * // Count the number of OtpTokens
     * const count = await prisma.otpToken.count({
     *   where: {
     *     // ... the filter for the OtpTokens we want to count
     *   }
     * })
    **/
    count<T extends OtpTokenCountArgs>(
      args?: Subset<T, OtpTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OtpTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OtpToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OtpTokenAggregateArgs>(args: Subset<T, OtpTokenAggregateArgs>): Prisma.PrismaPromise<GetOtpTokenAggregateType<T>>

    /**
     * Group by OtpToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OtpTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OtpTokenGroupByArgs['orderBy'] }
        : { orderBy?: OtpTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OtpTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOtpTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OtpToken model
   */
  readonly fields: OtpTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OtpToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OtpTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OtpToken model
   */
  interface OtpTokenFieldRefs {
    readonly id: FieldRef<"OtpToken", 'String'>
    readonly identifiant: FieldRef<"OtpToken", 'String'>
    readonly token: FieldRef<"OtpToken", 'String'>
    readonly data: FieldRef<"OtpToken", 'String'>
    readonly expiresAt: FieldRef<"OtpToken", 'DateTime'>
    readonly createdAt: FieldRef<"OtpToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OtpToken findUnique
   */
  export type OtpTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpToken
     */
    select?: OtpTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpToken
     */
    omit?: OtpTokenOmit<ExtArgs> | null
    /**
     * Filter, which OtpToken to fetch.
     */
    where: OtpTokenWhereUniqueInput
  }

  /**
   * OtpToken findUniqueOrThrow
   */
  export type OtpTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpToken
     */
    select?: OtpTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpToken
     */
    omit?: OtpTokenOmit<ExtArgs> | null
    /**
     * Filter, which OtpToken to fetch.
     */
    where: OtpTokenWhereUniqueInput
  }

  /**
   * OtpToken findFirst
   */
  export type OtpTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpToken
     */
    select?: OtpTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpToken
     */
    omit?: OtpTokenOmit<ExtArgs> | null
    /**
     * Filter, which OtpToken to fetch.
     */
    where?: OtpTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OtpTokens to fetch.
     */
    orderBy?: OtpTokenOrderByWithRelationInput | OtpTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OtpTokens.
     */
    cursor?: OtpTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OtpTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OtpTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OtpTokens.
     */
    distinct?: OtpTokenScalarFieldEnum | OtpTokenScalarFieldEnum[]
  }

  /**
   * OtpToken findFirstOrThrow
   */
  export type OtpTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpToken
     */
    select?: OtpTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpToken
     */
    omit?: OtpTokenOmit<ExtArgs> | null
    /**
     * Filter, which OtpToken to fetch.
     */
    where?: OtpTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OtpTokens to fetch.
     */
    orderBy?: OtpTokenOrderByWithRelationInput | OtpTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OtpTokens.
     */
    cursor?: OtpTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OtpTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OtpTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OtpTokens.
     */
    distinct?: OtpTokenScalarFieldEnum | OtpTokenScalarFieldEnum[]
  }

  /**
   * OtpToken findMany
   */
  export type OtpTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpToken
     */
    select?: OtpTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpToken
     */
    omit?: OtpTokenOmit<ExtArgs> | null
    /**
     * Filter, which OtpTokens to fetch.
     */
    where?: OtpTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OtpTokens to fetch.
     */
    orderBy?: OtpTokenOrderByWithRelationInput | OtpTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OtpTokens.
     */
    cursor?: OtpTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OtpTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OtpTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OtpTokens.
     */
    distinct?: OtpTokenScalarFieldEnum | OtpTokenScalarFieldEnum[]
  }

  /**
   * OtpToken create
   */
  export type OtpTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpToken
     */
    select?: OtpTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpToken
     */
    omit?: OtpTokenOmit<ExtArgs> | null
    /**
     * The data needed to create a OtpToken.
     */
    data: XOR<OtpTokenCreateInput, OtpTokenUncheckedCreateInput>
  }

  /**
   * OtpToken createMany
   */
  export type OtpTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OtpTokens.
     */
    data: OtpTokenCreateManyInput | OtpTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OtpToken createManyAndReturn
   */
  export type OtpTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpToken
     */
    select?: OtpTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OtpToken
     */
    omit?: OtpTokenOmit<ExtArgs> | null
    /**
     * The data used to create many OtpTokens.
     */
    data: OtpTokenCreateManyInput | OtpTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OtpToken update
   */
  export type OtpTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpToken
     */
    select?: OtpTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpToken
     */
    omit?: OtpTokenOmit<ExtArgs> | null
    /**
     * The data needed to update a OtpToken.
     */
    data: XOR<OtpTokenUpdateInput, OtpTokenUncheckedUpdateInput>
    /**
     * Choose, which OtpToken to update.
     */
    where: OtpTokenWhereUniqueInput
  }

  /**
   * OtpToken updateMany
   */
  export type OtpTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OtpTokens.
     */
    data: XOR<OtpTokenUpdateManyMutationInput, OtpTokenUncheckedUpdateManyInput>
    /**
     * Filter which OtpTokens to update
     */
    where?: OtpTokenWhereInput
    /**
     * Limit how many OtpTokens to update.
     */
    limit?: number
  }

  /**
   * OtpToken updateManyAndReturn
   */
  export type OtpTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpToken
     */
    select?: OtpTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OtpToken
     */
    omit?: OtpTokenOmit<ExtArgs> | null
    /**
     * The data used to update OtpTokens.
     */
    data: XOR<OtpTokenUpdateManyMutationInput, OtpTokenUncheckedUpdateManyInput>
    /**
     * Filter which OtpTokens to update
     */
    where?: OtpTokenWhereInput
    /**
     * Limit how many OtpTokens to update.
     */
    limit?: number
  }

  /**
   * OtpToken upsert
   */
  export type OtpTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpToken
     */
    select?: OtpTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpToken
     */
    omit?: OtpTokenOmit<ExtArgs> | null
    /**
     * The filter to search for the OtpToken to update in case it exists.
     */
    where: OtpTokenWhereUniqueInput
    /**
     * In case the OtpToken found by the `where` argument doesn't exist, create a new OtpToken with this data.
     */
    create: XOR<OtpTokenCreateInput, OtpTokenUncheckedCreateInput>
    /**
     * In case the OtpToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OtpTokenUpdateInput, OtpTokenUncheckedUpdateInput>
  }

  /**
   * OtpToken delete
   */
  export type OtpTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpToken
     */
    select?: OtpTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpToken
     */
    omit?: OtpTokenOmit<ExtArgs> | null
    /**
     * Filter which OtpToken to delete.
     */
    where: OtpTokenWhereUniqueInput
  }

  /**
   * OtpToken deleteMany
   */
  export type OtpTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OtpTokens to delete
     */
    where?: OtpTokenWhereInput
    /**
     * Limit how many OtpTokens to delete.
     */
    limit?: number
  }

  /**
   * OtpToken without action
   */
  export type OtpTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpToken
     */
    select?: OtpTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpToken
     */
    omit?: OtpTokenOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    nom: 'nom',
    prenom: 'prenom',
    email: 'email',
    telephone: 'telephone',
    motDePasse: 'motDePasse',
    role: 'role',
    avatar: 'avatar',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    age: 'age',
    genre: 'genre',
    wilaya: 'wilaya'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const VendeurProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    statut: 'statut',
    nomBoutique: 'nomBoutique',
    description: 'description',
    adminNote: 'adminNote',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    flowmerceApiKey: 'flowmerceApiKey'
  };

  export type VendeurProfileScalarFieldEnum = (typeof VendeurProfileScalarFieldEnum)[keyof typeof VendeurProfileScalarFieldEnum]


  export const VendeurDocumentScalarFieldEnum: {
    id: 'id',
    vendeurId: 'vendeurId',
    type: 'type',
    label: 'label',
    description: 'description',
    fichier: 'fichier',
    statut: 'statut',
    adminNote: 'adminNote',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VendeurDocumentScalarFieldEnum = (typeof VendeurDocumentScalarFieldEnum)[keyof typeof VendeurDocumentScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    id: 'id',
    nom: 'nom',
    description: 'description',
    image: 'image',
    statut: 'statut',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    vendeurId: 'vendeurId'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const ProductScalarFieldEnum: {
    id: 'id',
    nom: 'nom',
    description: 'description',
    prix: 'prix',
    stock: 'stock',
    images: 'images',
    prixVariables: 'prixVariables',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    categoryId: 'categoryId',
    actif: 'actif',
    vendeurId: 'vendeurId'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const ProductVariantScalarFieldEnum: {
    id: 'id',
    productId: 'productId',
    nom: 'nom',
    couleur: 'couleur',
    stock: 'stock',
    images: 'images',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProductVariantScalarFieldEnum = (typeof ProductVariantScalarFieldEnum)[keyof typeof ProductVariantScalarFieldEnum]


  export const CartScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId'
  };

  export type CartScalarFieldEnum = (typeof CartScalarFieldEnum)[keyof typeof CartScalarFieldEnum]


  export const CartItemScalarFieldEnum: {
    id: 'id',
    quantite: 'quantite',
    cartId: 'cartId',
    productId: 'productId',
    variantId: 'variantId'
  };

  export type CartItemScalarFieldEnum = (typeof CartItemScalarFieldEnum)[keyof typeof CartItemScalarFieldEnum]


  export const FavoriteScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    userId: 'userId',
    productId: 'productId'
  };

  export type FavoriteScalarFieldEnum = (typeof FavoriteScalarFieldEnum)[keyof typeof FavoriteScalarFieldEnum]


  export const OrderScalarFieldEnum: {
    id: 'id',
    statut: 'statut',
    total: 'total',
    adresse: 'adresse',
    modePaiement: 'modePaiement',
    methodeExpedition: 'methodeExpedition',
    fraisLivraison: 'fraisLivraison',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId',
    scan1Done: 'scan1Done',
    scan1Result: 'scan1Result',
    scan1ShippingAllowed: 'scan1ShippingAllowed',
    scan2Done: 'scan2Done',
    scan2Result: 'scan2Result',
    retourDemande: 'retourDemande'
  };

  export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum]


  export const OrderItemScalarFieldEnum: {
    id: 'id',
    quantite: 'quantite',
    prix: 'prix',
    orderId: 'orderId',
    productId: 'productId',
    variantId: 'variantId',
    variantNom: 'variantNom'
  };

  export type OrderItemScalarFieldEnum = (typeof OrderItemScalarFieldEnum)[keyof typeof OrderItemScalarFieldEnum]


  export const ResetTokenScalarFieldEnum: {
    id: 'id',
    token: 'token',
    userId: 'userId',
    expiresAt: 'expiresAt',
    used: 'used',
    createdAt: 'createdAt',
    verified: 'verified',
    code: 'code'
  };

  export type ResetTokenScalarFieldEnum = (typeof ResetTokenScalarFieldEnum)[keyof typeof ResetTokenScalarFieldEnum]


  export const OtpTokenScalarFieldEnum: {
    id: 'id',
    identifiant: 'identifiant',
    token: 'token',
    data: 'data',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt'
  };

  export type OtpTokenScalarFieldEnum = (typeof OtpTokenScalarFieldEnum)[keyof typeof OtpTokenScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Genre'
   */
  export type EnumGenreFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Genre'>
    


  /**
   * Reference to a field of type 'Genre[]'
   */
  export type ListEnumGenreFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Genre[]'>
    


  /**
   * Reference to a field of type 'VendeurStatut'
   */
  export type EnumVendeurStatutFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VendeurStatut'>
    


  /**
   * Reference to a field of type 'VendeurStatut[]'
   */
  export type ListEnumVendeurStatutFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VendeurStatut[]'>
    


  /**
   * Reference to a field of type 'DocumentStatut'
   */
  export type EnumDocumentStatutFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DocumentStatut'>
    


  /**
   * Reference to a field of type 'DocumentStatut[]'
   */
  export type ListEnumDocumentStatutFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DocumentStatut[]'>
    


  /**
   * Reference to a field of type 'CategoryStatut'
   */
  export type EnumCategoryStatutFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CategoryStatut'>
    


  /**
   * Reference to a field of type 'CategoryStatut[]'
   */
  export type ListEnumCategoryStatutFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CategoryStatut[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'OrderStatus'
   */
  export type EnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus'>
    


  /**
   * Reference to a field of type 'OrderStatus[]'
   */
  export type ListEnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    nom?: StringFilter<"User"> | string
    prenom?: StringFilter<"User"> | string
    email?: StringNullableFilter<"User"> | string | null
    telephone?: StringNullableFilter<"User"> | string | null
    motDePasse?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    avatar?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    age?: IntNullableFilter<"User"> | number | null
    genre?: EnumGenreNullableFilter<"User"> | $Enums.Genre | null
    wilaya?: StringNullableFilter<"User"> | string | null
    cart?: XOR<CartNullableScalarRelationFilter, CartWhereInput> | null
    favorites?: FavoriteListRelationFilter
    orders?: OrderListRelationFilter
    resetTokens?: ResetTokenListRelationFilter
    vendeurProfile?: XOR<VendeurProfileNullableScalarRelationFilter, VendeurProfileWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    email?: SortOrderInput | SortOrder
    telephone?: SortOrderInput | SortOrder
    motDePasse?: SortOrderInput | SortOrder
    role?: SortOrder
    avatar?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    age?: SortOrderInput | SortOrder
    genre?: SortOrderInput | SortOrder
    wilaya?: SortOrderInput | SortOrder
    cart?: CartOrderByWithRelationInput
    favorites?: FavoriteOrderByRelationAggregateInput
    orders?: OrderOrderByRelationAggregateInput
    resetTokens?: ResetTokenOrderByRelationAggregateInput
    vendeurProfile?: VendeurProfileOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    telephone?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    nom?: StringFilter<"User"> | string
    prenom?: StringFilter<"User"> | string
    motDePasse?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    avatar?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    age?: IntNullableFilter<"User"> | number | null
    genre?: EnumGenreNullableFilter<"User"> | $Enums.Genre | null
    wilaya?: StringNullableFilter<"User"> | string | null
    cart?: XOR<CartNullableScalarRelationFilter, CartWhereInput> | null
    favorites?: FavoriteListRelationFilter
    orders?: OrderListRelationFilter
    resetTokens?: ResetTokenListRelationFilter
    vendeurProfile?: XOR<VendeurProfileNullableScalarRelationFilter, VendeurProfileWhereInput> | null
  }, "id" | "email" | "telephone">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    email?: SortOrderInput | SortOrder
    telephone?: SortOrderInput | SortOrder
    motDePasse?: SortOrderInput | SortOrder
    role?: SortOrder
    avatar?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    age?: SortOrderInput | SortOrder
    genre?: SortOrderInput | SortOrder
    wilaya?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    nom?: StringWithAggregatesFilter<"User"> | string
    prenom?: StringWithAggregatesFilter<"User"> | string
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    telephone?: StringNullableWithAggregatesFilter<"User"> | string | null
    motDePasse?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    avatar?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    age?: IntNullableWithAggregatesFilter<"User"> | number | null
    genre?: EnumGenreNullableWithAggregatesFilter<"User"> | $Enums.Genre | null
    wilaya?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type VendeurProfileWhereInput = {
    AND?: VendeurProfileWhereInput | VendeurProfileWhereInput[]
    OR?: VendeurProfileWhereInput[]
    NOT?: VendeurProfileWhereInput | VendeurProfileWhereInput[]
    id?: StringFilter<"VendeurProfile"> | string
    userId?: StringFilter<"VendeurProfile"> | string
    statut?: EnumVendeurStatutFilter<"VendeurProfile"> | $Enums.VendeurStatut
    nomBoutique?: StringNullableFilter<"VendeurProfile"> | string | null
    description?: StringNullableFilter<"VendeurProfile"> | string | null
    adminNote?: StringNullableFilter<"VendeurProfile"> | string | null
    createdAt?: DateTimeFilter<"VendeurProfile"> | Date | string
    updatedAt?: DateTimeFilter<"VendeurProfile"> | Date | string
    flowmerceApiKey?: StringNullableFilter<"VendeurProfile"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    documents?: VendeurDocumentListRelationFilter
    products?: ProductListRelationFilter
    categories?: CategoryListRelationFilter
  }

  export type VendeurProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    statut?: SortOrder
    nomBoutique?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    adminNote?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    flowmerceApiKey?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    documents?: VendeurDocumentOrderByRelationAggregateInput
    products?: ProductOrderByRelationAggregateInput
    categories?: CategoryOrderByRelationAggregateInput
  }

  export type VendeurProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: VendeurProfileWhereInput | VendeurProfileWhereInput[]
    OR?: VendeurProfileWhereInput[]
    NOT?: VendeurProfileWhereInput | VendeurProfileWhereInput[]
    statut?: EnumVendeurStatutFilter<"VendeurProfile"> | $Enums.VendeurStatut
    nomBoutique?: StringNullableFilter<"VendeurProfile"> | string | null
    description?: StringNullableFilter<"VendeurProfile"> | string | null
    adminNote?: StringNullableFilter<"VendeurProfile"> | string | null
    createdAt?: DateTimeFilter<"VendeurProfile"> | Date | string
    updatedAt?: DateTimeFilter<"VendeurProfile"> | Date | string
    flowmerceApiKey?: StringNullableFilter<"VendeurProfile"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    documents?: VendeurDocumentListRelationFilter
    products?: ProductListRelationFilter
    categories?: CategoryListRelationFilter
  }, "id" | "userId">

  export type VendeurProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    statut?: SortOrder
    nomBoutique?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    adminNote?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    flowmerceApiKey?: SortOrderInput | SortOrder
    _count?: VendeurProfileCountOrderByAggregateInput
    _max?: VendeurProfileMaxOrderByAggregateInput
    _min?: VendeurProfileMinOrderByAggregateInput
  }

  export type VendeurProfileScalarWhereWithAggregatesInput = {
    AND?: VendeurProfileScalarWhereWithAggregatesInput | VendeurProfileScalarWhereWithAggregatesInput[]
    OR?: VendeurProfileScalarWhereWithAggregatesInput[]
    NOT?: VendeurProfileScalarWhereWithAggregatesInput | VendeurProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"VendeurProfile"> | string
    userId?: StringWithAggregatesFilter<"VendeurProfile"> | string
    statut?: EnumVendeurStatutWithAggregatesFilter<"VendeurProfile"> | $Enums.VendeurStatut
    nomBoutique?: StringNullableWithAggregatesFilter<"VendeurProfile"> | string | null
    description?: StringNullableWithAggregatesFilter<"VendeurProfile"> | string | null
    adminNote?: StringNullableWithAggregatesFilter<"VendeurProfile"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"VendeurProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"VendeurProfile"> | Date | string
    flowmerceApiKey?: StringNullableWithAggregatesFilter<"VendeurProfile"> | string | null
  }

  export type VendeurDocumentWhereInput = {
    AND?: VendeurDocumentWhereInput | VendeurDocumentWhereInput[]
    OR?: VendeurDocumentWhereInput[]
    NOT?: VendeurDocumentWhereInput | VendeurDocumentWhereInput[]
    id?: StringFilter<"VendeurDocument"> | string
    vendeurId?: StringFilter<"VendeurDocument"> | string
    type?: StringFilter<"VendeurDocument"> | string
    label?: StringFilter<"VendeurDocument"> | string
    description?: StringNullableFilter<"VendeurDocument"> | string | null
    fichier?: StringNullableFilter<"VendeurDocument"> | string | null
    statut?: EnumDocumentStatutFilter<"VendeurDocument"> | $Enums.DocumentStatut
    adminNote?: StringNullableFilter<"VendeurDocument"> | string | null
    createdAt?: DateTimeFilter<"VendeurDocument"> | Date | string
    updatedAt?: DateTimeFilter<"VendeurDocument"> | Date | string
    vendeur?: XOR<VendeurProfileScalarRelationFilter, VendeurProfileWhereInput>
  }

  export type VendeurDocumentOrderByWithRelationInput = {
    id?: SortOrder
    vendeurId?: SortOrder
    type?: SortOrder
    label?: SortOrder
    description?: SortOrderInput | SortOrder
    fichier?: SortOrderInput | SortOrder
    statut?: SortOrder
    adminNote?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    vendeur?: VendeurProfileOrderByWithRelationInput
  }

  export type VendeurDocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VendeurDocumentWhereInput | VendeurDocumentWhereInput[]
    OR?: VendeurDocumentWhereInput[]
    NOT?: VendeurDocumentWhereInput | VendeurDocumentWhereInput[]
    vendeurId?: StringFilter<"VendeurDocument"> | string
    type?: StringFilter<"VendeurDocument"> | string
    label?: StringFilter<"VendeurDocument"> | string
    description?: StringNullableFilter<"VendeurDocument"> | string | null
    fichier?: StringNullableFilter<"VendeurDocument"> | string | null
    statut?: EnumDocumentStatutFilter<"VendeurDocument"> | $Enums.DocumentStatut
    adminNote?: StringNullableFilter<"VendeurDocument"> | string | null
    createdAt?: DateTimeFilter<"VendeurDocument"> | Date | string
    updatedAt?: DateTimeFilter<"VendeurDocument"> | Date | string
    vendeur?: XOR<VendeurProfileScalarRelationFilter, VendeurProfileWhereInput>
  }, "id">

  export type VendeurDocumentOrderByWithAggregationInput = {
    id?: SortOrder
    vendeurId?: SortOrder
    type?: SortOrder
    label?: SortOrder
    description?: SortOrderInput | SortOrder
    fichier?: SortOrderInput | SortOrder
    statut?: SortOrder
    adminNote?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VendeurDocumentCountOrderByAggregateInput
    _max?: VendeurDocumentMaxOrderByAggregateInput
    _min?: VendeurDocumentMinOrderByAggregateInput
  }

  export type VendeurDocumentScalarWhereWithAggregatesInput = {
    AND?: VendeurDocumentScalarWhereWithAggregatesInput | VendeurDocumentScalarWhereWithAggregatesInput[]
    OR?: VendeurDocumentScalarWhereWithAggregatesInput[]
    NOT?: VendeurDocumentScalarWhereWithAggregatesInput | VendeurDocumentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"VendeurDocument"> | string
    vendeurId?: StringWithAggregatesFilter<"VendeurDocument"> | string
    type?: StringWithAggregatesFilter<"VendeurDocument"> | string
    label?: StringWithAggregatesFilter<"VendeurDocument"> | string
    description?: StringNullableWithAggregatesFilter<"VendeurDocument"> | string | null
    fichier?: StringNullableWithAggregatesFilter<"VendeurDocument"> | string | null
    statut?: EnumDocumentStatutWithAggregatesFilter<"VendeurDocument"> | $Enums.DocumentStatut
    adminNote?: StringNullableWithAggregatesFilter<"VendeurDocument"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"VendeurDocument"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"VendeurDocument"> | Date | string
  }

  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    id?: StringFilter<"Category"> | string
    nom?: StringFilter<"Category"> | string
    description?: StringNullableFilter<"Category"> | string | null
    image?: StringNullableFilter<"Category"> | string | null
    statut?: EnumCategoryStatutFilter<"Category"> | $Enums.CategoryStatut
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
    vendeurId?: StringNullableFilter<"Category"> | string | null
    vendeur?: XOR<VendeurProfileNullableScalarRelationFilter, VendeurProfileWhereInput> | null
    products?: ProductListRelationFilter
  }

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder
    nom?: SortOrder
    description?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    statut?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    vendeurId?: SortOrderInput | SortOrder
    vendeur?: VendeurProfileOrderByWithRelationInput
    products?: ProductOrderByRelationAggregateInput
  }

  export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    nom?: string
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    description?: StringNullableFilter<"Category"> | string | null
    image?: StringNullableFilter<"Category"> | string | null
    statut?: EnumCategoryStatutFilter<"Category"> | $Enums.CategoryStatut
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
    vendeurId?: StringNullableFilter<"Category"> | string | null
    vendeur?: XOR<VendeurProfileNullableScalarRelationFilter, VendeurProfileWhereInput> | null
    products?: ProductListRelationFilter
  }, "id" | "nom">

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder
    nom?: SortOrder
    description?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    statut?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    vendeurId?: SortOrderInput | SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    OR?: CategoryScalarWhereWithAggregatesInput[]
    NOT?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Category"> | string
    nom?: StringWithAggregatesFilter<"Category"> | string
    description?: StringNullableWithAggregatesFilter<"Category"> | string | null
    image?: StringNullableWithAggregatesFilter<"Category"> | string | null
    statut?: EnumCategoryStatutWithAggregatesFilter<"Category"> | $Enums.CategoryStatut
    createdAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
    vendeurId?: StringNullableWithAggregatesFilter<"Category"> | string | null
  }

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    id?: StringFilter<"Product"> | string
    nom?: StringFilter<"Product"> | string
    description?: StringNullableFilter<"Product"> | string | null
    prix?: FloatFilter<"Product"> | number
    stock?: IntFilter<"Product"> | number
    images?: StringNullableListFilter<"Product">
    prixVariables?: JsonNullableFilter<"Product">
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    categoryId?: StringFilter<"Product"> | string
    actif?: BoolFilter<"Product"> | boolean
    vendeurId?: StringNullableFilter<"Product"> | string | null
    cartItems?: CartItemListRelationFilter
    favorites?: FavoriteListRelationFilter
    orderItems?: OrderItemListRelationFilter
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
    vendeur?: XOR<VendeurProfileNullableScalarRelationFilter, VendeurProfileWhereInput> | null
    variants?: ProductVariantListRelationFilter
  }

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder
    nom?: SortOrder
    description?: SortOrderInput | SortOrder
    prix?: SortOrder
    stock?: SortOrder
    images?: SortOrder
    prixVariables?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    categoryId?: SortOrder
    actif?: SortOrder
    vendeurId?: SortOrderInput | SortOrder
    cartItems?: CartItemOrderByRelationAggregateInput
    favorites?: FavoriteOrderByRelationAggregateInput
    orderItems?: OrderItemOrderByRelationAggregateInput
    category?: CategoryOrderByWithRelationInput
    vendeur?: VendeurProfileOrderByWithRelationInput
    variants?: ProductVariantOrderByRelationAggregateInput
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    nom?: StringFilter<"Product"> | string
    description?: StringNullableFilter<"Product"> | string | null
    prix?: FloatFilter<"Product"> | number
    stock?: IntFilter<"Product"> | number
    images?: StringNullableListFilter<"Product">
    prixVariables?: JsonNullableFilter<"Product">
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    categoryId?: StringFilter<"Product"> | string
    actif?: BoolFilter<"Product"> | boolean
    vendeurId?: StringNullableFilter<"Product"> | string | null
    cartItems?: CartItemListRelationFilter
    favorites?: FavoriteListRelationFilter
    orderItems?: OrderItemListRelationFilter
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
    vendeur?: XOR<VendeurProfileNullableScalarRelationFilter, VendeurProfileWhereInput> | null
    variants?: ProductVariantListRelationFilter
  }, "id">

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    nom?: SortOrder
    description?: SortOrderInput | SortOrder
    prix?: SortOrder
    stock?: SortOrder
    images?: SortOrder
    prixVariables?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    categoryId?: SortOrder
    actif?: SortOrder
    vendeurId?: SortOrderInput | SortOrder
    _count?: ProductCountOrderByAggregateInput
    _avg?: ProductAvgOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
    _sum?: ProductSumOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Product"> | string
    nom?: StringWithAggregatesFilter<"Product"> | string
    description?: StringNullableWithAggregatesFilter<"Product"> | string | null
    prix?: FloatWithAggregatesFilter<"Product"> | number
    stock?: IntWithAggregatesFilter<"Product"> | number
    images?: StringNullableListFilter<"Product">
    prixVariables?: JsonNullableWithAggregatesFilter<"Product">
    createdAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
    categoryId?: StringWithAggregatesFilter<"Product"> | string
    actif?: BoolWithAggregatesFilter<"Product"> | boolean
    vendeurId?: StringNullableWithAggregatesFilter<"Product"> | string | null
  }

  export type ProductVariantWhereInput = {
    AND?: ProductVariantWhereInput | ProductVariantWhereInput[]
    OR?: ProductVariantWhereInput[]
    NOT?: ProductVariantWhereInput | ProductVariantWhereInput[]
    id?: StringFilter<"ProductVariant"> | string
    productId?: StringFilter<"ProductVariant"> | string
    nom?: StringFilter<"ProductVariant"> | string
    couleur?: StringNullableFilter<"ProductVariant"> | string | null
    stock?: IntFilter<"ProductVariant"> | number
    images?: StringNullableListFilter<"ProductVariant">
    createdAt?: DateTimeFilter<"ProductVariant"> | Date | string
    updatedAt?: DateTimeFilter<"ProductVariant"> | Date | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    cartItems?: CartItemListRelationFilter
    orderItems?: OrderItemListRelationFilter
  }

  export type ProductVariantOrderByWithRelationInput = {
    id?: SortOrder
    productId?: SortOrder
    nom?: SortOrder
    couleur?: SortOrderInput | SortOrder
    stock?: SortOrder
    images?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    product?: ProductOrderByWithRelationInput
    cartItems?: CartItemOrderByRelationAggregateInput
    orderItems?: OrderItemOrderByRelationAggregateInput
  }

  export type ProductVariantWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProductVariantWhereInput | ProductVariantWhereInput[]
    OR?: ProductVariantWhereInput[]
    NOT?: ProductVariantWhereInput | ProductVariantWhereInput[]
    productId?: StringFilter<"ProductVariant"> | string
    nom?: StringFilter<"ProductVariant"> | string
    couleur?: StringNullableFilter<"ProductVariant"> | string | null
    stock?: IntFilter<"ProductVariant"> | number
    images?: StringNullableListFilter<"ProductVariant">
    createdAt?: DateTimeFilter<"ProductVariant"> | Date | string
    updatedAt?: DateTimeFilter<"ProductVariant"> | Date | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    cartItems?: CartItemListRelationFilter
    orderItems?: OrderItemListRelationFilter
  }, "id">

  export type ProductVariantOrderByWithAggregationInput = {
    id?: SortOrder
    productId?: SortOrder
    nom?: SortOrder
    couleur?: SortOrderInput | SortOrder
    stock?: SortOrder
    images?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProductVariantCountOrderByAggregateInput
    _avg?: ProductVariantAvgOrderByAggregateInput
    _max?: ProductVariantMaxOrderByAggregateInput
    _min?: ProductVariantMinOrderByAggregateInput
    _sum?: ProductVariantSumOrderByAggregateInput
  }

  export type ProductVariantScalarWhereWithAggregatesInput = {
    AND?: ProductVariantScalarWhereWithAggregatesInput | ProductVariantScalarWhereWithAggregatesInput[]
    OR?: ProductVariantScalarWhereWithAggregatesInput[]
    NOT?: ProductVariantScalarWhereWithAggregatesInput | ProductVariantScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProductVariant"> | string
    productId?: StringWithAggregatesFilter<"ProductVariant"> | string
    nom?: StringWithAggregatesFilter<"ProductVariant"> | string
    couleur?: StringNullableWithAggregatesFilter<"ProductVariant"> | string | null
    stock?: IntWithAggregatesFilter<"ProductVariant"> | number
    images?: StringNullableListFilter<"ProductVariant">
    createdAt?: DateTimeWithAggregatesFilter<"ProductVariant"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ProductVariant"> | Date | string
  }

  export type CartWhereInput = {
    AND?: CartWhereInput | CartWhereInput[]
    OR?: CartWhereInput[]
    NOT?: CartWhereInput | CartWhereInput[]
    id?: StringFilter<"Cart"> | string
    createdAt?: DateTimeFilter<"Cart"> | Date | string
    updatedAt?: DateTimeFilter<"Cart"> | Date | string
    userId?: StringFilter<"Cart"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    items?: CartItemListRelationFilter
  }

  export type CartOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
    items?: CartItemOrderByRelationAggregateInput
  }

  export type CartWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: CartWhereInput | CartWhereInput[]
    OR?: CartWhereInput[]
    NOT?: CartWhereInput | CartWhereInput[]
    createdAt?: DateTimeFilter<"Cart"> | Date | string
    updatedAt?: DateTimeFilter<"Cart"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    items?: CartItemListRelationFilter
  }, "id" | "userId">

  export type CartOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    _count?: CartCountOrderByAggregateInput
    _max?: CartMaxOrderByAggregateInput
    _min?: CartMinOrderByAggregateInput
  }

  export type CartScalarWhereWithAggregatesInput = {
    AND?: CartScalarWhereWithAggregatesInput | CartScalarWhereWithAggregatesInput[]
    OR?: CartScalarWhereWithAggregatesInput[]
    NOT?: CartScalarWhereWithAggregatesInput | CartScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Cart"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Cart"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Cart"> | Date | string
    userId?: StringWithAggregatesFilter<"Cart"> | string
  }

  export type CartItemWhereInput = {
    AND?: CartItemWhereInput | CartItemWhereInput[]
    OR?: CartItemWhereInput[]
    NOT?: CartItemWhereInput | CartItemWhereInput[]
    id?: StringFilter<"CartItem"> | string
    quantite?: IntFilter<"CartItem"> | number
    cartId?: StringFilter<"CartItem"> | string
    productId?: StringFilter<"CartItem"> | string
    variantId?: StringNullableFilter<"CartItem"> | string | null
    cart?: XOR<CartScalarRelationFilter, CartWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    variant?: XOR<ProductVariantNullableScalarRelationFilter, ProductVariantWhereInput> | null
  }

  export type CartItemOrderByWithRelationInput = {
    id?: SortOrder
    quantite?: SortOrder
    cartId?: SortOrder
    productId?: SortOrder
    variantId?: SortOrderInput | SortOrder
    cart?: CartOrderByWithRelationInput
    product?: ProductOrderByWithRelationInput
    variant?: ProductVariantOrderByWithRelationInput
  }

  export type CartItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CartItemWhereInput | CartItemWhereInput[]
    OR?: CartItemWhereInput[]
    NOT?: CartItemWhereInput | CartItemWhereInput[]
    quantite?: IntFilter<"CartItem"> | number
    cartId?: StringFilter<"CartItem"> | string
    productId?: StringFilter<"CartItem"> | string
    variantId?: StringNullableFilter<"CartItem"> | string | null
    cart?: XOR<CartScalarRelationFilter, CartWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    variant?: XOR<ProductVariantNullableScalarRelationFilter, ProductVariantWhereInput> | null
  }, "id">

  export type CartItemOrderByWithAggregationInput = {
    id?: SortOrder
    quantite?: SortOrder
    cartId?: SortOrder
    productId?: SortOrder
    variantId?: SortOrderInput | SortOrder
    _count?: CartItemCountOrderByAggregateInput
    _avg?: CartItemAvgOrderByAggregateInput
    _max?: CartItemMaxOrderByAggregateInput
    _min?: CartItemMinOrderByAggregateInput
    _sum?: CartItemSumOrderByAggregateInput
  }

  export type CartItemScalarWhereWithAggregatesInput = {
    AND?: CartItemScalarWhereWithAggregatesInput | CartItemScalarWhereWithAggregatesInput[]
    OR?: CartItemScalarWhereWithAggregatesInput[]
    NOT?: CartItemScalarWhereWithAggregatesInput | CartItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CartItem"> | string
    quantite?: IntWithAggregatesFilter<"CartItem"> | number
    cartId?: StringWithAggregatesFilter<"CartItem"> | string
    productId?: StringWithAggregatesFilter<"CartItem"> | string
    variantId?: StringNullableWithAggregatesFilter<"CartItem"> | string | null
  }

  export type FavoriteWhereInput = {
    AND?: FavoriteWhereInput | FavoriteWhereInput[]
    OR?: FavoriteWhereInput[]
    NOT?: FavoriteWhereInput | FavoriteWhereInput[]
    id?: StringFilter<"Favorite"> | string
    createdAt?: DateTimeFilter<"Favorite"> | Date | string
    userId?: StringFilter<"Favorite"> | string
    productId?: StringFilter<"Favorite"> | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type FavoriteOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    product?: ProductOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type FavoriteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_productId?: FavoriteUserIdProductIdCompoundUniqueInput
    AND?: FavoriteWhereInput | FavoriteWhereInput[]
    OR?: FavoriteWhereInput[]
    NOT?: FavoriteWhereInput | FavoriteWhereInput[]
    createdAt?: DateTimeFilter<"Favorite"> | Date | string
    userId?: StringFilter<"Favorite"> | string
    productId?: StringFilter<"Favorite"> | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_productId">

  export type FavoriteOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    _count?: FavoriteCountOrderByAggregateInput
    _max?: FavoriteMaxOrderByAggregateInput
    _min?: FavoriteMinOrderByAggregateInput
  }

  export type FavoriteScalarWhereWithAggregatesInput = {
    AND?: FavoriteScalarWhereWithAggregatesInput | FavoriteScalarWhereWithAggregatesInput[]
    OR?: FavoriteScalarWhereWithAggregatesInput[]
    NOT?: FavoriteScalarWhereWithAggregatesInput | FavoriteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Favorite"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Favorite"> | Date | string
    userId?: StringWithAggregatesFilter<"Favorite"> | string
    productId?: StringWithAggregatesFilter<"Favorite"> | string
  }

  export type OrderWhereInput = {
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    id?: StringFilter<"Order"> | string
    statut?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    total?: FloatFilter<"Order"> | number
    adresse?: StringFilter<"Order"> | string
    modePaiement?: StringFilter<"Order"> | string
    methodeExpedition?: StringFilter<"Order"> | string
    fraisLivraison?: FloatFilter<"Order"> | number
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    userId?: StringFilter<"Order"> | string
    scan1Done?: BoolFilter<"Order"> | boolean
    scan1Result?: StringNullableFilter<"Order"> | string | null
    scan1ShippingAllowed?: BoolFilter<"Order"> | boolean
    scan2Done?: BoolFilter<"Order"> | boolean
    scan2Result?: StringNullableFilter<"Order"> | string | null
    retourDemande?: BoolFilter<"Order"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    items?: OrderItemListRelationFilter
  }

  export type OrderOrderByWithRelationInput = {
    id?: SortOrder
    statut?: SortOrder
    total?: SortOrder
    adresse?: SortOrder
    modePaiement?: SortOrder
    methodeExpedition?: SortOrder
    fraisLivraison?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    scan1Done?: SortOrder
    scan1Result?: SortOrderInput | SortOrder
    scan1ShippingAllowed?: SortOrder
    scan2Done?: SortOrder
    scan2Result?: SortOrderInput | SortOrder
    retourDemande?: SortOrder
    user?: UserOrderByWithRelationInput
    items?: OrderItemOrderByRelationAggregateInput
  }

  export type OrderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    statut?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    total?: FloatFilter<"Order"> | number
    adresse?: StringFilter<"Order"> | string
    modePaiement?: StringFilter<"Order"> | string
    methodeExpedition?: StringFilter<"Order"> | string
    fraisLivraison?: FloatFilter<"Order"> | number
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    userId?: StringFilter<"Order"> | string
    scan1Done?: BoolFilter<"Order"> | boolean
    scan1Result?: StringNullableFilter<"Order"> | string | null
    scan1ShippingAllowed?: BoolFilter<"Order"> | boolean
    scan2Done?: BoolFilter<"Order"> | boolean
    scan2Result?: StringNullableFilter<"Order"> | string | null
    retourDemande?: BoolFilter<"Order"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    items?: OrderItemListRelationFilter
  }, "id">

  export type OrderOrderByWithAggregationInput = {
    id?: SortOrder
    statut?: SortOrder
    total?: SortOrder
    adresse?: SortOrder
    modePaiement?: SortOrder
    methodeExpedition?: SortOrder
    fraisLivraison?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    scan1Done?: SortOrder
    scan1Result?: SortOrderInput | SortOrder
    scan1ShippingAllowed?: SortOrder
    scan2Done?: SortOrder
    scan2Result?: SortOrderInput | SortOrder
    retourDemande?: SortOrder
    _count?: OrderCountOrderByAggregateInput
    _avg?: OrderAvgOrderByAggregateInput
    _max?: OrderMaxOrderByAggregateInput
    _min?: OrderMinOrderByAggregateInput
    _sum?: OrderSumOrderByAggregateInput
  }

  export type OrderScalarWhereWithAggregatesInput = {
    AND?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    OR?: OrderScalarWhereWithAggregatesInput[]
    NOT?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Order"> | string
    statut?: EnumOrderStatusWithAggregatesFilter<"Order"> | $Enums.OrderStatus
    total?: FloatWithAggregatesFilter<"Order"> | number
    adresse?: StringWithAggregatesFilter<"Order"> | string
    modePaiement?: StringWithAggregatesFilter<"Order"> | string
    methodeExpedition?: StringWithAggregatesFilter<"Order"> | string
    fraisLivraison?: FloatWithAggregatesFilter<"Order"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
    userId?: StringWithAggregatesFilter<"Order"> | string
    scan1Done?: BoolWithAggregatesFilter<"Order"> | boolean
    scan1Result?: StringNullableWithAggregatesFilter<"Order"> | string | null
    scan1ShippingAllowed?: BoolWithAggregatesFilter<"Order"> | boolean
    scan2Done?: BoolWithAggregatesFilter<"Order"> | boolean
    scan2Result?: StringNullableWithAggregatesFilter<"Order"> | string | null
    retourDemande?: BoolWithAggregatesFilter<"Order"> | boolean
  }

  export type OrderItemWhereInput = {
    AND?: OrderItemWhereInput | OrderItemWhereInput[]
    OR?: OrderItemWhereInput[]
    NOT?: OrderItemWhereInput | OrderItemWhereInput[]
    id?: StringFilter<"OrderItem"> | string
    quantite?: IntFilter<"OrderItem"> | number
    prix?: FloatFilter<"OrderItem"> | number
    orderId?: StringFilter<"OrderItem"> | string
    productId?: StringFilter<"OrderItem"> | string
    variantId?: StringNullableFilter<"OrderItem"> | string | null
    variantNom?: StringNullableFilter<"OrderItem"> | string | null
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    variant?: XOR<ProductVariantNullableScalarRelationFilter, ProductVariantWhereInput> | null
  }

  export type OrderItemOrderByWithRelationInput = {
    id?: SortOrder
    quantite?: SortOrder
    prix?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    variantId?: SortOrderInput | SortOrder
    variantNom?: SortOrderInput | SortOrder
    order?: OrderOrderByWithRelationInput
    product?: ProductOrderByWithRelationInput
    variant?: ProductVariantOrderByWithRelationInput
  }

  export type OrderItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrderItemWhereInput | OrderItemWhereInput[]
    OR?: OrderItemWhereInput[]
    NOT?: OrderItemWhereInput | OrderItemWhereInput[]
    quantite?: IntFilter<"OrderItem"> | number
    prix?: FloatFilter<"OrderItem"> | number
    orderId?: StringFilter<"OrderItem"> | string
    productId?: StringFilter<"OrderItem"> | string
    variantId?: StringNullableFilter<"OrderItem"> | string | null
    variantNom?: StringNullableFilter<"OrderItem"> | string | null
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    variant?: XOR<ProductVariantNullableScalarRelationFilter, ProductVariantWhereInput> | null
  }, "id">

  export type OrderItemOrderByWithAggregationInput = {
    id?: SortOrder
    quantite?: SortOrder
    prix?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    variantId?: SortOrderInput | SortOrder
    variantNom?: SortOrderInput | SortOrder
    _count?: OrderItemCountOrderByAggregateInput
    _avg?: OrderItemAvgOrderByAggregateInput
    _max?: OrderItemMaxOrderByAggregateInput
    _min?: OrderItemMinOrderByAggregateInput
    _sum?: OrderItemSumOrderByAggregateInput
  }

  export type OrderItemScalarWhereWithAggregatesInput = {
    AND?: OrderItemScalarWhereWithAggregatesInput | OrderItemScalarWhereWithAggregatesInput[]
    OR?: OrderItemScalarWhereWithAggregatesInput[]
    NOT?: OrderItemScalarWhereWithAggregatesInput | OrderItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OrderItem"> | string
    quantite?: IntWithAggregatesFilter<"OrderItem"> | number
    prix?: FloatWithAggregatesFilter<"OrderItem"> | number
    orderId?: StringWithAggregatesFilter<"OrderItem"> | string
    productId?: StringWithAggregatesFilter<"OrderItem"> | string
    variantId?: StringNullableWithAggregatesFilter<"OrderItem"> | string | null
    variantNom?: StringNullableWithAggregatesFilter<"OrderItem"> | string | null
  }

  export type ResetTokenWhereInput = {
    AND?: ResetTokenWhereInput | ResetTokenWhereInput[]
    OR?: ResetTokenWhereInput[]
    NOT?: ResetTokenWhereInput | ResetTokenWhereInput[]
    id?: StringFilter<"ResetToken"> | string
    token?: StringFilter<"ResetToken"> | string
    userId?: StringFilter<"ResetToken"> | string
    expiresAt?: DateTimeFilter<"ResetToken"> | Date | string
    used?: BoolFilter<"ResetToken"> | boolean
    createdAt?: DateTimeFilter<"ResetToken"> | Date | string
    verified?: BoolFilter<"ResetToken"> | boolean
    code?: StringFilter<"ResetToken"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ResetTokenOrderByWithRelationInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    used?: SortOrder
    createdAt?: SortOrder
    verified?: SortOrder
    code?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ResetTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: ResetTokenWhereInput | ResetTokenWhereInput[]
    OR?: ResetTokenWhereInput[]
    NOT?: ResetTokenWhereInput | ResetTokenWhereInput[]
    userId?: StringFilter<"ResetToken"> | string
    expiresAt?: DateTimeFilter<"ResetToken"> | Date | string
    used?: BoolFilter<"ResetToken"> | boolean
    createdAt?: DateTimeFilter<"ResetToken"> | Date | string
    verified?: BoolFilter<"ResetToken"> | boolean
    code?: StringFilter<"ResetToken"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "token">

  export type ResetTokenOrderByWithAggregationInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    used?: SortOrder
    createdAt?: SortOrder
    verified?: SortOrder
    code?: SortOrder
    _count?: ResetTokenCountOrderByAggregateInput
    _max?: ResetTokenMaxOrderByAggregateInput
    _min?: ResetTokenMinOrderByAggregateInput
  }

  export type ResetTokenScalarWhereWithAggregatesInput = {
    AND?: ResetTokenScalarWhereWithAggregatesInput | ResetTokenScalarWhereWithAggregatesInput[]
    OR?: ResetTokenScalarWhereWithAggregatesInput[]
    NOT?: ResetTokenScalarWhereWithAggregatesInput | ResetTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ResetToken"> | string
    token?: StringWithAggregatesFilter<"ResetToken"> | string
    userId?: StringWithAggregatesFilter<"ResetToken"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"ResetToken"> | Date | string
    used?: BoolWithAggregatesFilter<"ResetToken"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"ResetToken"> | Date | string
    verified?: BoolWithAggregatesFilter<"ResetToken"> | boolean
    code?: StringWithAggregatesFilter<"ResetToken"> | string
  }

  export type OtpTokenWhereInput = {
    AND?: OtpTokenWhereInput | OtpTokenWhereInput[]
    OR?: OtpTokenWhereInput[]
    NOT?: OtpTokenWhereInput | OtpTokenWhereInput[]
    id?: StringFilter<"OtpToken"> | string
    identifiant?: StringFilter<"OtpToken"> | string
    token?: StringFilter<"OtpToken"> | string
    data?: StringFilter<"OtpToken"> | string
    expiresAt?: DateTimeFilter<"OtpToken"> | Date | string
    createdAt?: DateTimeFilter<"OtpToken"> | Date | string
  }

  export type OtpTokenOrderByWithRelationInput = {
    id?: SortOrder
    identifiant?: SortOrder
    token?: SortOrder
    data?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type OtpTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OtpTokenWhereInput | OtpTokenWhereInput[]
    OR?: OtpTokenWhereInput[]
    NOT?: OtpTokenWhereInput | OtpTokenWhereInput[]
    identifiant?: StringFilter<"OtpToken"> | string
    token?: StringFilter<"OtpToken"> | string
    data?: StringFilter<"OtpToken"> | string
    expiresAt?: DateTimeFilter<"OtpToken"> | Date | string
    createdAt?: DateTimeFilter<"OtpToken"> | Date | string
  }, "id">

  export type OtpTokenOrderByWithAggregationInput = {
    id?: SortOrder
    identifiant?: SortOrder
    token?: SortOrder
    data?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    _count?: OtpTokenCountOrderByAggregateInput
    _max?: OtpTokenMaxOrderByAggregateInput
    _min?: OtpTokenMinOrderByAggregateInput
  }

  export type OtpTokenScalarWhereWithAggregatesInput = {
    AND?: OtpTokenScalarWhereWithAggregatesInput | OtpTokenScalarWhereWithAggregatesInput[]
    OR?: OtpTokenScalarWhereWithAggregatesInput[]
    NOT?: OtpTokenScalarWhereWithAggregatesInput | OtpTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OtpToken"> | string
    identifiant?: StringWithAggregatesFilter<"OtpToken"> | string
    token?: StringWithAggregatesFilter<"OtpToken"> | string
    data?: StringWithAggregatesFilter<"OtpToken"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"OtpToken"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"OtpToken"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    nom: string
    prenom: string
    email?: string | null
    telephone?: string | null
    motDePasse?: string | null
    role?: $Enums.Role
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    age?: number | null
    genre?: $Enums.Genre | null
    wilaya?: string | null
    cart?: CartCreateNestedOneWithoutUserInput
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    orders?: OrderCreateNestedManyWithoutUserInput
    resetTokens?: ResetTokenCreateNestedManyWithoutUserInput
    vendeurProfile?: VendeurProfileCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    nom: string
    prenom: string
    email?: string | null
    telephone?: string | null
    motDePasse?: string | null
    role?: $Enums.Role
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    age?: number | null
    genre?: $Enums.Genre | null
    wilaya?: string | null
    cart?: CartUncheckedCreateNestedOneWithoutUserInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput
    resetTokens?: ResetTokenUncheckedCreateNestedManyWithoutUserInput
    vendeurProfile?: VendeurProfileUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    motDePasse?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    genre?: NullableEnumGenreFieldUpdateOperationsInput | $Enums.Genre | null
    wilaya?: NullableStringFieldUpdateOperationsInput | string | null
    cart?: CartUpdateOneWithoutUserNestedInput
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    orders?: OrderUpdateManyWithoutUserNestedInput
    resetTokens?: ResetTokenUpdateManyWithoutUserNestedInput
    vendeurProfile?: VendeurProfileUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    motDePasse?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    genre?: NullableEnumGenreFieldUpdateOperationsInput | $Enums.Genre | null
    wilaya?: NullableStringFieldUpdateOperationsInput | string | null
    cart?: CartUncheckedUpdateOneWithoutUserNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput
    resetTokens?: ResetTokenUncheckedUpdateManyWithoutUserNestedInput
    vendeurProfile?: VendeurProfileUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    nom: string
    prenom: string
    email?: string | null
    telephone?: string | null
    motDePasse?: string | null
    role?: $Enums.Role
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    age?: number | null
    genre?: $Enums.Genre | null
    wilaya?: string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    motDePasse?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    genre?: NullableEnumGenreFieldUpdateOperationsInput | $Enums.Genre | null
    wilaya?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    motDePasse?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    genre?: NullableEnumGenreFieldUpdateOperationsInput | $Enums.Genre | null
    wilaya?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type VendeurProfileCreateInput = {
    id?: string
    statut?: $Enums.VendeurStatut
    nomBoutique?: string | null
    description?: string | null
    adminNote?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    flowmerceApiKey?: string | null
    user: UserCreateNestedOneWithoutVendeurProfileInput
    documents?: VendeurDocumentCreateNestedManyWithoutVendeurInput
    products?: ProductCreateNestedManyWithoutVendeurInput
    categories?: CategoryCreateNestedManyWithoutVendeurInput
  }

  export type VendeurProfileUncheckedCreateInput = {
    id?: string
    userId: string
    statut?: $Enums.VendeurStatut
    nomBoutique?: string | null
    description?: string | null
    adminNote?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    flowmerceApiKey?: string | null
    documents?: VendeurDocumentUncheckedCreateNestedManyWithoutVendeurInput
    products?: ProductUncheckedCreateNestedManyWithoutVendeurInput
    categories?: CategoryUncheckedCreateNestedManyWithoutVendeurInput
  }

  export type VendeurProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    statut?: EnumVendeurStatutFieldUpdateOperationsInput | $Enums.VendeurStatut
    nomBoutique?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    flowmerceApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutVendeurProfileNestedInput
    documents?: VendeurDocumentUpdateManyWithoutVendeurNestedInput
    products?: ProductUpdateManyWithoutVendeurNestedInput
    categories?: CategoryUpdateManyWithoutVendeurNestedInput
  }

  export type VendeurProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    statut?: EnumVendeurStatutFieldUpdateOperationsInput | $Enums.VendeurStatut
    nomBoutique?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    flowmerceApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: VendeurDocumentUncheckedUpdateManyWithoutVendeurNestedInput
    products?: ProductUncheckedUpdateManyWithoutVendeurNestedInput
    categories?: CategoryUncheckedUpdateManyWithoutVendeurNestedInput
  }

  export type VendeurProfileCreateManyInput = {
    id?: string
    userId: string
    statut?: $Enums.VendeurStatut
    nomBoutique?: string | null
    description?: string | null
    adminNote?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    flowmerceApiKey?: string | null
  }

  export type VendeurProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    statut?: EnumVendeurStatutFieldUpdateOperationsInput | $Enums.VendeurStatut
    nomBoutique?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    flowmerceApiKey?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type VendeurProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    statut?: EnumVendeurStatutFieldUpdateOperationsInput | $Enums.VendeurStatut
    nomBoutique?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    flowmerceApiKey?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type VendeurDocumentCreateInput = {
    id?: string
    type: string
    label: string
    description?: string | null
    fichier?: string | null
    statut?: $Enums.DocumentStatut
    adminNote?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    vendeur: VendeurProfileCreateNestedOneWithoutDocumentsInput
  }

  export type VendeurDocumentUncheckedCreateInput = {
    id?: string
    vendeurId: string
    type: string
    label: string
    description?: string | null
    fichier?: string | null
    statut?: $Enums.DocumentStatut
    adminNote?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VendeurDocumentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    fichier?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumDocumentStatutFieldUpdateOperationsInput | $Enums.DocumentStatut
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vendeur?: VendeurProfileUpdateOneRequiredWithoutDocumentsNestedInput
  }

  export type VendeurDocumentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    vendeurId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    fichier?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumDocumentStatutFieldUpdateOperationsInput | $Enums.DocumentStatut
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VendeurDocumentCreateManyInput = {
    id?: string
    vendeurId: string
    type: string
    label: string
    description?: string | null
    fichier?: string | null
    statut?: $Enums.DocumentStatut
    adminNote?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VendeurDocumentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    fichier?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumDocumentStatutFieldUpdateOperationsInput | $Enums.DocumentStatut
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VendeurDocumentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    vendeurId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    fichier?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumDocumentStatutFieldUpdateOperationsInput | $Enums.DocumentStatut
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryCreateInput = {
    id?: string
    nom: string
    description?: string | null
    image?: string | null
    statut?: $Enums.CategoryStatut
    createdAt?: Date | string
    updatedAt?: Date | string
    vendeur?: VendeurProfileCreateNestedOneWithoutCategoriesInput
    products?: ProductCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateInput = {
    id?: string
    nom: string
    description?: string | null
    image?: string | null
    statut?: $Enums.CategoryStatut
    createdAt?: Date | string
    updatedAt?: Date | string
    vendeurId?: string | null
    products?: ProductUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumCategoryStatutFieldUpdateOperationsInput | $Enums.CategoryStatut
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vendeur?: VendeurProfileUpdateOneWithoutCategoriesNestedInput
    products?: ProductUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumCategoryStatutFieldUpdateOperationsInput | $Enums.CategoryStatut
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vendeurId?: NullableStringFieldUpdateOperationsInput | string | null
    products?: ProductUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryCreateManyInput = {
    id?: string
    nom: string
    description?: string | null
    image?: string | null
    statut?: $Enums.CategoryStatut
    createdAt?: Date | string
    updatedAt?: Date | string
    vendeurId?: string | null
  }

  export type CategoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumCategoryStatutFieldUpdateOperationsInput | $Enums.CategoryStatut
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumCategoryStatutFieldUpdateOperationsInput | $Enums.CategoryStatut
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vendeurId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProductCreateInput = {
    id?: string
    nom: string
    description?: string | null
    prix: number
    stock?: number
    images?: ProductCreateimagesInput | string[]
    prixVariables?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    actif?: boolean
    cartItems?: CartItemCreateNestedManyWithoutProductInput
    favorites?: FavoriteCreateNestedManyWithoutProductInput
    orderItems?: OrderItemCreateNestedManyWithoutProductInput
    category: CategoryCreateNestedOneWithoutProductsInput
    vendeur?: VendeurProfileCreateNestedOneWithoutProductsInput
    variants?: ProductVariantCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateInput = {
    id?: string
    nom: string
    description?: string | null
    prix: number
    stock?: number
    images?: ProductCreateimagesInput | string[]
    prixVariables?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    categoryId: string
    actif?: boolean
    vendeurId?: string | null
    cartItems?: CartItemUncheckedCreateNestedManyWithoutProductInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutProductInput
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutProductInput
    variants?: ProductVariantUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    prix?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    images?: ProductUpdateimagesInput | string[]
    prixVariables?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actif?: BoolFieldUpdateOperationsInput | boolean
    cartItems?: CartItemUpdateManyWithoutProductNestedInput
    favorites?: FavoriteUpdateManyWithoutProductNestedInput
    orderItems?: OrderItemUpdateManyWithoutProductNestedInput
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
    vendeur?: VendeurProfileUpdateOneWithoutProductsNestedInput
    variants?: ProductVariantUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    prix?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    images?: ProductUpdateimagesInput | string[]
    prixVariables?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: StringFieldUpdateOperationsInput | string
    actif?: BoolFieldUpdateOperationsInput | boolean
    vendeurId?: NullableStringFieldUpdateOperationsInput | string | null
    cartItems?: CartItemUncheckedUpdateManyWithoutProductNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutProductNestedInput
    orderItems?: OrderItemUncheckedUpdateManyWithoutProductNestedInput
    variants?: ProductVariantUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateManyInput = {
    id?: string
    nom: string
    description?: string | null
    prix: number
    stock?: number
    images?: ProductCreateimagesInput | string[]
    prixVariables?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    categoryId: string
    actif?: boolean
    vendeurId?: string | null
  }

  export type ProductUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    prix?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    images?: ProductUpdateimagesInput | string[]
    prixVariables?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actif?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProductUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    prix?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    images?: ProductUpdateimagesInput | string[]
    prixVariables?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: StringFieldUpdateOperationsInput | string
    actif?: BoolFieldUpdateOperationsInput | boolean
    vendeurId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProductVariantCreateInput = {
    id?: string
    nom: string
    couleur?: string | null
    stock?: number
    images?: ProductVariantCreateimagesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutVariantsInput
    cartItems?: CartItemCreateNestedManyWithoutVariantInput
    orderItems?: OrderItemCreateNestedManyWithoutVariantInput
  }

  export type ProductVariantUncheckedCreateInput = {
    id?: string
    productId: string
    nom: string
    couleur?: string | null
    stock?: number
    images?: ProductVariantCreateimagesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    cartItems?: CartItemUncheckedCreateNestedManyWithoutVariantInput
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutVariantInput
  }

  export type ProductVariantUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    couleur?: NullableStringFieldUpdateOperationsInput | string | null
    stock?: IntFieldUpdateOperationsInput | number
    images?: ProductVariantUpdateimagesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutVariantsNestedInput
    cartItems?: CartItemUpdateManyWithoutVariantNestedInput
    orderItems?: OrderItemUpdateManyWithoutVariantNestedInput
  }

  export type ProductVariantUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    couleur?: NullableStringFieldUpdateOperationsInput | string | null
    stock?: IntFieldUpdateOperationsInput | number
    images?: ProductVariantUpdateimagesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cartItems?: CartItemUncheckedUpdateManyWithoutVariantNestedInput
    orderItems?: OrderItemUncheckedUpdateManyWithoutVariantNestedInput
  }

  export type ProductVariantCreateManyInput = {
    id?: string
    productId: string
    nom: string
    couleur?: string | null
    stock?: number
    images?: ProductVariantCreateimagesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductVariantUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    couleur?: NullableStringFieldUpdateOperationsInput | string | null
    stock?: IntFieldUpdateOperationsInput | number
    images?: ProductVariantUpdateimagesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductVariantUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    couleur?: NullableStringFieldUpdateOperationsInput | string | null
    stock?: IntFieldUpdateOperationsInput | number
    images?: ProductVariantUpdateimagesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CartCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCartInput
    items?: CartItemCreateNestedManyWithoutCartInput
  }

  export type CartUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    items?: CartItemUncheckedCreateNestedManyWithoutCartInput
  }

  export type CartUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCartNestedInput
    items?: CartItemUpdateManyWithoutCartNestedInput
  }

  export type CartUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    items?: CartItemUncheckedUpdateManyWithoutCartNestedInput
  }

  export type CartCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type CartUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CartUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type CartItemCreateInput = {
    id?: string
    quantite?: number
    cart: CartCreateNestedOneWithoutItemsInput
    product: ProductCreateNestedOneWithoutCartItemsInput
    variant?: ProductVariantCreateNestedOneWithoutCartItemsInput
  }

  export type CartItemUncheckedCreateInput = {
    id?: string
    quantite?: number
    cartId: string
    productId: string
    variantId?: string | null
  }

  export type CartItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantite?: IntFieldUpdateOperationsInput | number
    cart?: CartUpdateOneRequiredWithoutItemsNestedInput
    product?: ProductUpdateOneRequiredWithoutCartItemsNestedInput
    variant?: ProductVariantUpdateOneWithoutCartItemsNestedInput
  }

  export type CartItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantite?: IntFieldUpdateOperationsInput | number
    cartId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    variantId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CartItemCreateManyInput = {
    id?: string
    quantite?: number
    cartId: string
    productId: string
    variantId?: string | null
  }

  export type CartItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantite?: IntFieldUpdateOperationsInput | number
  }

  export type CartItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantite?: IntFieldUpdateOperationsInput | number
    cartId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    variantId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FavoriteCreateInput = {
    id?: string
    createdAt?: Date | string
    product: ProductCreateNestedOneWithoutFavoritesInput
    user: UserCreateNestedOneWithoutFavoritesInput
  }

  export type FavoriteUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    userId: string
    productId: string
  }

  export type FavoriteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutFavoritesNestedInput
    user?: UserUpdateOneRequiredWithoutFavoritesNestedInput
  }

  export type FavoriteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
  }

  export type FavoriteCreateManyInput = {
    id?: string
    createdAt?: Date | string
    userId: string
    productId: string
  }

  export type FavoriteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoriteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
  }

  export type OrderCreateInput = {
    id?: string
    statut?: $Enums.OrderStatus
    total: number
    adresse: string
    modePaiement?: string
    methodeExpedition?: string
    fraisLivraison?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    scan1Done?: boolean
    scan1Result?: string | null
    scan1ShippingAllowed?: boolean
    scan2Done?: boolean
    scan2Result?: string | null
    retourDemande?: boolean
    user: UserCreateNestedOneWithoutOrdersInput
    items?: OrderItemCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateInput = {
    id?: string
    statut?: $Enums.OrderStatus
    total: number
    adresse: string
    modePaiement?: string
    methodeExpedition?: string
    fraisLivraison?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    scan1Done?: boolean
    scan1Result?: string | null
    scan1ShippingAllowed?: boolean
    scan2Done?: boolean
    scan2Result?: string | null
    retourDemande?: boolean
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    statut?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    total?: FloatFieldUpdateOperationsInput | number
    adresse?: StringFieldUpdateOperationsInput | string
    modePaiement?: StringFieldUpdateOperationsInput | string
    methodeExpedition?: StringFieldUpdateOperationsInput | string
    fraisLivraison?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scan1Done?: BoolFieldUpdateOperationsInput | boolean
    scan1Result?: NullableStringFieldUpdateOperationsInput | string | null
    scan1ShippingAllowed?: BoolFieldUpdateOperationsInput | boolean
    scan2Done?: BoolFieldUpdateOperationsInput | boolean
    scan2Result?: NullableStringFieldUpdateOperationsInput | string | null
    retourDemande?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutOrdersNestedInput
    items?: OrderItemUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    statut?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    total?: FloatFieldUpdateOperationsInput | number
    adresse?: StringFieldUpdateOperationsInput | string
    modePaiement?: StringFieldUpdateOperationsInput | string
    methodeExpedition?: StringFieldUpdateOperationsInput | string
    fraisLivraison?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    scan1Done?: BoolFieldUpdateOperationsInput | boolean
    scan1Result?: NullableStringFieldUpdateOperationsInput | string | null
    scan1ShippingAllowed?: BoolFieldUpdateOperationsInput | boolean
    scan2Done?: BoolFieldUpdateOperationsInput | boolean
    scan2Result?: NullableStringFieldUpdateOperationsInput | string | null
    retourDemande?: BoolFieldUpdateOperationsInput | boolean
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderCreateManyInput = {
    id?: string
    statut?: $Enums.OrderStatus
    total: number
    adresse: string
    modePaiement?: string
    methodeExpedition?: string
    fraisLivraison?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    scan1Done?: boolean
    scan1Result?: string | null
    scan1ShippingAllowed?: boolean
    scan2Done?: boolean
    scan2Result?: string | null
    retourDemande?: boolean
  }

  export type OrderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    statut?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    total?: FloatFieldUpdateOperationsInput | number
    adresse?: StringFieldUpdateOperationsInput | string
    modePaiement?: StringFieldUpdateOperationsInput | string
    methodeExpedition?: StringFieldUpdateOperationsInput | string
    fraisLivraison?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scan1Done?: BoolFieldUpdateOperationsInput | boolean
    scan1Result?: NullableStringFieldUpdateOperationsInput | string | null
    scan1ShippingAllowed?: BoolFieldUpdateOperationsInput | boolean
    scan2Done?: BoolFieldUpdateOperationsInput | boolean
    scan2Result?: NullableStringFieldUpdateOperationsInput | string | null
    retourDemande?: BoolFieldUpdateOperationsInput | boolean
  }

  export type OrderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    statut?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    total?: FloatFieldUpdateOperationsInput | number
    adresse?: StringFieldUpdateOperationsInput | string
    modePaiement?: StringFieldUpdateOperationsInput | string
    methodeExpedition?: StringFieldUpdateOperationsInput | string
    fraisLivraison?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    scan1Done?: BoolFieldUpdateOperationsInput | boolean
    scan1Result?: NullableStringFieldUpdateOperationsInput | string | null
    scan1ShippingAllowed?: BoolFieldUpdateOperationsInput | boolean
    scan2Done?: BoolFieldUpdateOperationsInput | boolean
    scan2Result?: NullableStringFieldUpdateOperationsInput | string | null
    retourDemande?: BoolFieldUpdateOperationsInput | boolean
  }

  export type OrderItemCreateInput = {
    id?: string
    quantite: number
    prix: number
    variantNom?: string | null
    order: OrderCreateNestedOneWithoutItemsInput
    product: ProductCreateNestedOneWithoutOrderItemsInput
    variant?: ProductVariantCreateNestedOneWithoutOrderItemsInput
  }

  export type OrderItemUncheckedCreateInput = {
    id?: string
    quantite: number
    prix: number
    orderId: string
    productId: string
    variantId?: string | null
    variantNom?: string | null
  }

  export type OrderItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantite?: IntFieldUpdateOperationsInput | number
    prix?: FloatFieldUpdateOperationsInput | number
    variantNom?: NullableStringFieldUpdateOperationsInput | string | null
    order?: OrderUpdateOneRequiredWithoutItemsNestedInput
    product?: ProductUpdateOneRequiredWithoutOrderItemsNestedInput
    variant?: ProductVariantUpdateOneWithoutOrderItemsNestedInput
  }

  export type OrderItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantite?: IntFieldUpdateOperationsInput | number
    prix?: FloatFieldUpdateOperationsInput | number
    orderId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    variantId?: NullableStringFieldUpdateOperationsInput | string | null
    variantNom?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OrderItemCreateManyInput = {
    id?: string
    quantite: number
    prix: number
    orderId: string
    productId: string
    variantId?: string | null
    variantNom?: string | null
  }

  export type OrderItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantite?: IntFieldUpdateOperationsInput | number
    prix?: FloatFieldUpdateOperationsInput | number
    variantNom?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OrderItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantite?: IntFieldUpdateOperationsInput | number
    prix?: FloatFieldUpdateOperationsInput | number
    orderId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    variantId?: NullableStringFieldUpdateOperationsInput | string | null
    variantNom?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ResetTokenCreateInput = {
    id?: string
    token: string
    expiresAt: Date | string
    used?: boolean
    createdAt?: Date | string
    verified?: boolean
    code: string
    user: UserCreateNestedOneWithoutResetTokensInput
  }

  export type ResetTokenUncheckedCreateInput = {
    id?: string
    token: string
    userId: string
    expiresAt: Date | string
    used?: boolean
    createdAt?: Date | string
    verified?: boolean
    code: string
  }

  export type ResetTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    code?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutResetTokensNestedInput
  }

  export type ResetTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    code?: StringFieldUpdateOperationsInput | string
  }

  export type ResetTokenCreateManyInput = {
    id?: string
    token: string
    userId: string
    expiresAt: Date | string
    used?: boolean
    createdAt?: Date | string
    verified?: boolean
    code: string
  }

  export type ResetTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    code?: StringFieldUpdateOperationsInput | string
  }

  export type ResetTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    code?: StringFieldUpdateOperationsInput | string
  }

  export type OtpTokenCreateInput = {
    id?: string
    identifiant: string
    token: string
    data: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type OtpTokenUncheckedCreateInput = {
    id?: string
    identifiant: string
    token: string
    data: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type OtpTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifiant?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OtpTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifiant?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OtpTokenCreateManyInput = {
    id?: string
    identifiant: string
    token: string
    data: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type OtpTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifiant?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OtpTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifiant?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type EnumGenreNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Genre | EnumGenreFieldRefInput<$PrismaModel> | null
    in?: $Enums.Genre[] | ListEnumGenreFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Genre[] | ListEnumGenreFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGenreNullableFilter<$PrismaModel> | $Enums.Genre | null
  }

  export type CartNullableScalarRelationFilter = {
    is?: CartWhereInput | null
    isNot?: CartWhereInput | null
  }

  export type FavoriteListRelationFilter = {
    every?: FavoriteWhereInput
    some?: FavoriteWhereInput
    none?: FavoriteWhereInput
  }

  export type OrderListRelationFilter = {
    every?: OrderWhereInput
    some?: OrderWhereInput
    none?: OrderWhereInput
  }

  export type ResetTokenListRelationFilter = {
    every?: ResetTokenWhereInput
    some?: ResetTokenWhereInput
    none?: ResetTokenWhereInput
  }

  export type VendeurProfileNullableScalarRelationFilter = {
    is?: VendeurProfileWhereInput | null
    isNot?: VendeurProfileWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type FavoriteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ResetTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    email?: SortOrder
    telephone?: SortOrder
    motDePasse?: SortOrder
    role?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    age?: SortOrder
    genre?: SortOrder
    wilaya?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    age?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    email?: SortOrder
    telephone?: SortOrder
    motDePasse?: SortOrder
    role?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    age?: SortOrder
    genre?: SortOrder
    wilaya?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    email?: SortOrder
    telephone?: SortOrder
    motDePasse?: SortOrder
    role?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    age?: SortOrder
    genre?: SortOrder
    wilaya?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    age?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumGenreNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Genre | EnumGenreFieldRefInput<$PrismaModel> | null
    in?: $Enums.Genre[] | ListEnumGenreFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Genre[] | ListEnumGenreFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGenreNullableWithAggregatesFilter<$PrismaModel> | $Enums.Genre | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumGenreNullableFilter<$PrismaModel>
    _max?: NestedEnumGenreNullableFilter<$PrismaModel>
  }

  export type EnumVendeurStatutFilter<$PrismaModel = never> = {
    equals?: $Enums.VendeurStatut | EnumVendeurStatutFieldRefInput<$PrismaModel>
    in?: $Enums.VendeurStatut[] | ListEnumVendeurStatutFieldRefInput<$PrismaModel>
    notIn?: $Enums.VendeurStatut[] | ListEnumVendeurStatutFieldRefInput<$PrismaModel>
    not?: NestedEnumVendeurStatutFilter<$PrismaModel> | $Enums.VendeurStatut
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type VendeurDocumentListRelationFilter = {
    every?: VendeurDocumentWhereInput
    some?: VendeurDocumentWhereInput
    none?: VendeurDocumentWhereInput
  }

  export type ProductListRelationFilter = {
    every?: ProductWhereInput
    some?: ProductWhereInput
    none?: ProductWhereInput
  }

  export type CategoryListRelationFilter = {
    every?: CategoryWhereInput
    some?: CategoryWhereInput
    none?: CategoryWhereInput
  }

  export type VendeurDocumentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VendeurProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    statut?: SortOrder
    nomBoutique?: SortOrder
    description?: SortOrder
    adminNote?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    flowmerceApiKey?: SortOrder
  }

  export type VendeurProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    statut?: SortOrder
    nomBoutique?: SortOrder
    description?: SortOrder
    adminNote?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    flowmerceApiKey?: SortOrder
  }

  export type VendeurProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    statut?: SortOrder
    nomBoutique?: SortOrder
    description?: SortOrder
    adminNote?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    flowmerceApiKey?: SortOrder
  }

  export type EnumVendeurStatutWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VendeurStatut | EnumVendeurStatutFieldRefInput<$PrismaModel>
    in?: $Enums.VendeurStatut[] | ListEnumVendeurStatutFieldRefInput<$PrismaModel>
    notIn?: $Enums.VendeurStatut[] | ListEnumVendeurStatutFieldRefInput<$PrismaModel>
    not?: NestedEnumVendeurStatutWithAggregatesFilter<$PrismaModel> | $Enums.VendeurStatut
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVendeurStatutFilter<$PrismaModel>
    _max?: NestedEnumVendeurStatutFilter<$PrismaModel>
  }

  export type EnumDocumentStatutFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentStatut | EnumDocumentStatutFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentStatut[] | ListEnumDocumentStatutFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentStatut[] | ListEnumDocumentStatutFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentStatutFilter<$PrismaModel> | $Enums.DocumentStatut
  }

  export type VendeurProfileScalarRelationFilter = {
    is?: VendeurProfileWhereInput
    isNot?: VendeurProfileWhereInput
  }

  export type VendeurDocumentCountOrderByAggregateInput = {
    id?: SortOrder
    vendeurId?: SortOrder
    type?: SortOrder
    label?: SortOrder
    description?: SortOrder
    fichier?: SortOrder
    statut?: SortOrder
    adminNote?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VendeurDocumentMaxOrderByAggregateInput = {
    id?: SortOrder
    vendeurId?: SortOrder
    type?: SortOrder
    label?: SortOrder
    description?: SortOrder
    fichier?: SortOrder
    statut?: SortOrder
    adminNote?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VendeurDocumentMinOrderByAggregateInput = {
    id?: SortOrder
    vendeurId?: SortOrder
    type?: SortOrder
    label?: SortOrder
    description?: SortOrder
    fichier?: SortOrder
    statut?: SortOrder
    adminNote?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumDocumentStatutWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentStatut | EnumDocumentStatutFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentStatut[] | ListEnumDocumentStatutFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentStatut[] | ListEnumDocumentStatutFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentStatutWithAggregatesFilter<$PrismaModel> | $Enums.DocumentStatut
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDocumentStatutFilter<$PrismaModel>
    _max?: NestedEnumDocumentStatutFilter<$PrismaModel>
  }

  export type EnumCategoryStatutFilter<$PrismaModel = never> = {
    equals?: $Enums.CategoryStatut | EnumCategoryStatutFieldRefInput<$PrismaModel>
    in?: $Enums.CategoryStatut[] | ListEnumCategoryStatutFieldRefInput<$PrismaModel>
    notIn?: $Enums.CategoryStatut[] | ListEnumCategoryStatutFieldRefInput<$PrismaModel>
    not?: NestedEnumCategoryStatutFilter<$PrismaModel> | $Enums.CategoryStatut
  }

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    description?: SortOrder
    image?: SortOrder
    statut?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    vendeurId?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    description?: SortOrder
    image?: SortOrder
    statut?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    vendeurId?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    description?: SortOrder
    image?: SortOrder
    statut?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    vendeurId?: SortOrder
  }

  export type EnumCategoryStatutWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CategoryStatut | EnumCategoryStatutFieldRefInput<$PrismaModel>
    in?: $Enums.CategoryStatut[] | ListEnumCategoryStatutFieldRefInput<$PrismaModel>
    notIn?: $Enums.CategoryStatut[] | ListEnumCategoryStatutFieldRefInput<$PrismaModel>
    not?: NestedEnumCategoryStatutWithAggregatesFilter<$PrismaModel> | $Enums.CategoryStatut
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCategoryStatutFilter<$PrismaModel>
    _max?: NestedEnumCategoryStatutFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type CartItemListRelationFilter = {
    every?: CartItemWhereInput
    some?: CartItemWhereInput
    none?: CartItemWhereInput
  }

  export type OrderItemListRelationFilter = {
    every?: OrderItemWhereInput
    some?: OrderItemWhereInput
    none?: OrderItemWhereInput
  }

  export type CategoryScalarRelationFilter = {
    is?: CategoryWhereInput
    isNot?: CategoryWhereInput
  }

  export type ProductVariantListRelationFilter = {
    every?: ProductVariantWhereInput
    some?: ProductVariantWhereInput
    none?: ProductVariantWhereInput
  }

  export type CartItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrderItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductVariantOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    description?: SortOrder
    prix?: SortOrder
    stock?: SortOrder
    images?: SortOrder
    prixVariables?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    categoryId?: SortOrder
    actif?: SortOrder
    vendeurId?: SortOrder
  }

  export type ProductAvgOrderByAggregateInput = {
    prix?: SortOrder
    stock?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    description?: SortOrder
    prix?: SortOrder
    stock?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    categoryId?: SortOrder
    actif?: SortOrder
    vendeurId?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    description?: SortOrder
    prix?: SortOrder
    stock?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    categoryId?: SortOrder
    actif?: SortOrder
    vendeurId?: SortOrder
  }

  export type ProductSumOrderByAggregateInput = {
    prix?: SortOrder
    stock?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ProductScalarRelationFilter = {
    is?: ProductWhereInput
    isNot?: ProductWhereInput
  }

  export type ProductVariantCountOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    nom?: SortOrder
    couleur?: SortOrder
    stock?: SortOrder
    images?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductVariantAvgOrderByAggregateInput = {
    stock?: SortOrder
  }

  export type ProductVariantMaxOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    nom?: SortOrder
    couleur?: SortOrder
    stock?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductVariantMinOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    nom?: SortOrder
    couleur?: SortOrder
    stock?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductVariantSumOrderByAggregateInput = {
    stock?: SortOrder
  }

  export type CartCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type CartMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type CartMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type CartScalarRelationFilter = {
    is?: CartWhereInput
    isNot?: CartWhereInput
  }

  export type ProductVariantNullableScalarRelationFilter = {
    is?: ProductVariantWhereInput | null
    isNot?: ProductVariantWhereInput | null
  }

  export type CartItemCountOrderByAggregateInput = {
    id?: SortOrder
    quantite?: SortOrder
    cartId?: SortOrder
    productId?: SortOrder
    variantId?: SortOrder
  }

  export type CartItemAvgOrderByAggregateInput = {
    quantite?: SortOrder
  }

  export type CartItemMaxOrderByAggregateInput = {
    id?: SortOrder
    quantite?: SortOrder
    cartId?: SortOrder
    productId?: SortOrder
    variantId?: SortOrder
  }

  export type CartItemMinOrderByAggregateInput = {
    id?: SortOrder
    quantite?: SortOrder
    cartId?: SortOrder
    productId?: SortOrder
    variantId?: SortOrder
  }

  export type CartItemSumOrderByAggregateInput = {
    quantite?: SortOrder
  }

  export type FavoriteUserIdProductIdCompoundUniqueInput = {
    userId: string
    productId: string
  }

  export type FavoriteCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
  }

  export type FavoriteMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
  }

  export type FavoriteMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
  }

  export type EnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus
  }

  export type OrderCountOrderByAggregateInput = {
    id?: SortOrder
    statut?: SortOrder
    total?: SortOrder
    adresse?: SortOrder
    modePaiement?: SortOrder
    methodeExpedition?: SortOrder
    fraisLivraison?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    scan1Done?: SortOrder
    scan1Result?: SortOrder
    scan1ShippingAllowed?: SortOrder
    scan2Done?: SortOrder
    scan2Result?: SortOrder
    retourDemande?: SortOrder
  }

  export type OrderAvgOrderByAggregateInput = {
    total?: SortOrder
    fraisLivraison?: SortOrder
  }

  export type OrderMaxOrderByAggregateInput = {
    id?: SortOrder
    statut?: SortOrder
    total?: SortOrder
    adresse?: SortOrder
    modePaiement?: SortOrder
    methodeExpedition?: SortOrder
    fraisLivraison?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    scan1Done?: SortOrder
    scan1Result?: SortOrder
    scan1ShippingAllowed?: SortOrder
    scan2Done?: SortOrder
    scan2Result?: SortOrder
    retourDemande?: SortOrder
  }

  export type OrderMinOrderByAggregateInput = {
    id?: SortOrder
    statut?: SortOrder
    total?: SortOrder
    adresse?: SortOrder
    modePaiement?: SortOrder
    methodeExpedition?: SortOrder
    fraisLivraison?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    scan1Done?: SortOrder
    scan1Result?: SortOrder
    scan1ShippingAllowed?: SortOrder
    scan2Done?: SortOrder
    scan2Result?: SortOrder
    retourDemande?: SortOrder
  }

  export type OrderSumOrderByAggregateInput = {
    total?: SortOrder
    fraisLivraison?: SortOrder
  }

  export type EnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>
  }

  export type OrderScalarRelationFilter = {
    is?: OrderWhereInput
    isNot?: OrderWhereInput
  }

  export type OrderItemCountOrderByAggregateInput = {
    id?: SortOrder
    quantite?: SortOrder
    prix?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    variantId?: SortOrder
    variantNom?: SortOrder
  }

  export type OrderItemAvgOrderByAggregateInput = {
    quantite?: SortOrder
    prix?: SortOrder
  }

  export type OrderItemMaxOrderByAggregateInput = {
    id?: SortOrder
    quantite?: SortOrder
    prix?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    variantId?: SortOrder
    variantNom?: SortOrder
  }

  export type OrderItemMinOrderByAggregateInput = {
    id?: SortOrder
    quantite?: SortOrder
    prix?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    variantId?: SortOrder
    variantNom?: SortOrder
  }

  export type OrderItemSumOrderByAggregateInput = {
    quantite?: SortOrder
    prix?: SortOrder
  }

  export type ResetTokenCountOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    used?: SortOrder
    createdAt?: SortOrder
    verified?: SortOrder
    code?: SortOrder
  }

  export type ResetTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    used?: SortOrder
    createdAt?: SortOrder
    verified?: SortOrder
    code?: SortOrder
  }

  export type ResetTokenMinOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    used?: SortOrder
    createdAt?: SortOrder
    verified?: SortOrder
    code?: SortOrder
  }

  export type OtpTokenCountOrderByAggregateInput = {
    id?: SortOrder
    identifiant?: SortOrder
    token?: SortOrder
    data?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type OtpTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    identifiant?: SortOrder
    token?: SortOrder
    data?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type OtpTokenMinOrderByAggregateInput = {
    id?: SortOrder
    identifiant?: SortOrder
    token?: SortOrder
    data?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type CartCreateNestedOneWithoutUserInput = {
    create?: XOR<CartCreateWithoutUserInput, CartUncheckedCreateWithoutUserInput>
    connectOrCreate?: CartCreateOrConnectWithoutUserInput
    connect?: CartWhereUniqueInput
  }

  export type FavoriteCreateNestedManyWithoutUserInput = {
    create?: XOR<FavoriteCreateWithoutUserInput, FavoriteUncheckedCreateWithoutUserInput> | FavoriteCreateWithoutUserInput[] | FavoriteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FavoriteCreateOrConnectWithoutUserInput | FavoriteCreateOrConnectWithoutUserInput[]
    createMany?: FavoriteCreateManyUserInputEnvelope
    connect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
  }

  export type OrderCreateNestedManyWithoutUserInput = {
    create?: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput> | OrderCreateWithoutUserInput[] | OrderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutUserInput | OrderCreateOrConnectWithoutUserInput[]
    createMany?: OrderCreateManyUserInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type ResetTokenCreateNestedManyWithoutUserInput = {
    create?: XOR<ResetTokenCreateWithoutUserInput, ResetTokenUncheckedCreateWithoutUserInput> | ResetTokenCreateWithoutUserInput[] | ResetTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResetTokenCreateOrConnectWithoutUserInput | ResetTokenCreateOrConnectWithoutUserInput[]
    createMany?: ResetTokenCreateManyUserInputEnvelope
    connect?: ResetTokenWhereUniqueInput | ResetTokenWhereUniqueInput[]
  }

  export type VendeurProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<VendeurProfileCreateWithoutUserInput, VendeurProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: VendeurProfileCreateOrConnectWithoutUserInput
    connect?: VendeurProfileWhereUniqueInput
  }

  export type CartUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<CartCreateWithoutUserInput, CartUncheckedCreateWithoutUserInput>
    connectOrCreate?: CartCreateOrConnectWithoutUserInput
    connect?: CartWhereUniqueInput
  }

  export type FavoriteUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<FavoriteCreateWithoutUserInput, FavoriteUncheckedCreateWithoutUserInput> | FavoriteCreateWithoutUserInput[] | FavoriteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FavoriteCreateOrConnectWithoutUserInput | FavoriteCreateOrConnectWithoutUserInput[]
    createMany?: FavoriteCreateManyUserInputEnvelope
    connect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput> | OrderCreateWithoutUserInput[] | OrderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutUserInput | OrderCreateOrConnectWithoutUserInput[]
    createMany?: OrderCreateManyUserInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type ResetTokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ResetTokenCreateWithoutUserInput, ResetTokenUncheckedCreateWithoutUserInput> | ResetTokenCreateWithoutUserInput[] | ResetTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResetTokenCreateOrConnectWithoutUserInput | ResetTokenCreateOrConnectWithoutUserInput[]
    createMany?: ResetTokenCreateManyUserInputEnvelope
    connect?: ResetTokenWhereUniqueInput | ResetTokenWhereUniqueInput[]
  }

  export type VendeurProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<VendeurProfileCreateWithoutUserInput, VendeurProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: VendeurProfileCreateOrConnectWithoutUserInput
    connect?: VendeurProfileWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableEnumGenreFieldUpdateOperationsInput = {
    set?: $Enums.Genre | null
  }

  export type CartUpdateOneWithoutUserNestedInput = {
    create?: XOR<CartCreateWithoutUserInput, CartUncheckedCreateWithoutUserInput>
    connectOrCreate?: CartCreateOrConnectWithoutUserInput
    upsert?: CartUpsertWithoutUserInput
    disconnect?: CartWhereInput | boolean
    delete?: CartWhereInput | boolean
    connect?: CartWhereUniqueInput
    update?: XOR<XOR<CartUpdateToOneWithWhereWithoutUserInput, CartUpdateWithoutUserInput>, CartUncheckedUpdateWithoutUserInput>
  }

  export type FavoriteUpdateManyWithoutUserNestedInput = {
    create?: XOR<FavoriteCreateWithoutUserInput, FavoriteUncheckedCreateWithoutUserInput> | FavoriteCreateWithoutUserInput[] | FavoriteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FavoriteCreateOrConnectWithoutUserInput | FavoriteCreateOrConnectWithoutUserInput[]
    upsert?: FavoriteUpsertWithWhereUniqueWithoutUserInput | FavoriteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FavoriteCreateManyUserInputEnvelope
    set?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    disconnect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    delete?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    connect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    update?: FavoriteUpdateWithWhereUniqueWithoutUserInput | FavoriteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FavoriteUpdateManyWithWhereWithoutUserInput | FavoriteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FavoriteScalarWhereInput | FavoriteScalarWhereInput[]
  }

  export type OrderUpdateManyWithoutUserNestedInput = {
    create?: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput> | OrderCreateWithoutUserInput[] | OrderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutUserInput | OrderCreateOrConnectWithoutUserInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutUserInput | OrderUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OrderCreateManyUserInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutUserInput | OrderUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutUserInput | OrderUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type ResetTokenUpdateManyWithoutUserNestedInput = {
    create?: XOR<ResetTokenCreateWithoutUserInput, ResetTokenUncheckedCreateWithoutUserInput> | ResetTokenCreateWithoutUserInput[] | ResetTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResetTokenCreateOrConnectWithoutUserInput | ResetTokenCreateOrConnectWithoutUserInput[]
    upsert?: ResetTokenUpsertWithWhereUniqueWithoutUserInput | ResetTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ResetTokenCreateManyUserInputEnvelope
    set?: ResetTokenWhereUniqueInput | ResetTokenWhereUniqueInput[]
    disconnect?: ResetTokenWhereUniqueInput | ResetTokenWhereUniqueInput[]
    delete?: ResetTokenWhereUniqueInput | ResetTokenWhereUniqueInput[]
    connect?: ResetTokenWhereUniqueInput | ResetTokenWhereUniqueInput[]
    update?: ResetTokenUpdateWithWhereUniqueWithoutUserInput | ResetTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ResetTokenUpdateManyWithWhereWithoutUserInput | ResetTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ResetTokenScalarWhereInput | ResetTokenScalarWhereInput[]
  }

  export type VendeurProfileUpdateOneWithoutUserNestedInput = {
    create?: XOR<VendeurProfileCreateWithoutUserInput, VendeurProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: VendeurProfileCreateOrConnectWithoutUserInput
    upsert?: VendeurProfileUpsertWithoutUserInput
    disconnect?: VendeurProfileWhereInput | boolean
    delete?: VendeurProfileWhereInput | boolean
    connect?: VendeurProfileWhereUniqueInput
    update?: XOR<XOR<VendeurProfileUpdateToOneWithWhereWithoutUserInput, VendeurProfileUpdateWithoutUserInput>, VendeurProfileUncheckedUpdateWithoutUserInput>
  }

  export type CartUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<CartCreateWithoutUserInput, CartUncheckedCreateWithoutUserInput>
    connectOrCreate?: CartCreateOrConnectWithoutUserInput
    upsert?: CartUpsertWithoutUserInput
    disconnect?: CartWhereInput | boolean
    delete?: CartWhereInput | boolean
    connect?: CartWhereUniqueInput
    update?: XOR<XOR<CartUpdateToOneWithWhereWithoutUserInput, CartUpdateWithoutUserInput>, CartUncheckedUpdateWithoutUserInput>
  }

  export type FavoriteUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<FavoriteCreateWithoutUserInput, FavoriteUncheckedCreateWithoutUserInput> | FavoriteCreateWithoutUserInput[] | FavoriteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FavoriteCreateOrConnectWithoutUserInput | FavoriteCreateOrConnectWithoutUserInput[]
    upsert?: FavoriteUpsertWithWhereUniqueWithoutUserInput | FavoriteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FavoriteCreateManyUserInputEnvelope
    set?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    disconnect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    delete?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    connect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    update?: FavoriteUpdateWithWhereUniqueWithoutUserInput | FavoriteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FavoriteUpdateManyWithWhereWithoutUserInput | FavoriteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FavoriteScalarWhereInput | FavoriteScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput> | OrderCreateWithoutUserInput[] | OrderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutUserInput | OrderCreateOrConnectWithoutUserInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutUserInput | OrderUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OrderCreateManyUserInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutUserInput | OrderUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutUserInput | OrderUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type ResetTokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ResetTokenCreateWithoutUserInput, ResetTokenUncheckedCreateWithoutUserInput> | ResetTokenCreateWithoutUserInput[] | ResetTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResetTokenCreateOrConnectWithoutUserInput | ResetTokenCreateOrConnectWithoutUserInput[]
    upsert?: ResetTokenUpsertWithWhereUniqueWithoutUserInput | ResetTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ResetTokenCreateManyUserInputEnvelope
    set?: ResetTokenWhereUniqueInput | ResetTokenWhereUniqueInput[]
    disconnect?: ResetTokenWhereUniqueInput | ResetTokenWhereUniqueInput[]
    delete?: ResetTokenWhereUniqueInput | ResetTokenWhereUniqueInput[]
    connect?: ResetTokenWhereUniqueInput | ResetTokenWhereUniqueInput[]
    update?: ResetTokenUpdateWithWhereUniqueWithoutUserInput | ResetTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ResetTokenUpdateManyWithWhereWithoutUserInput | ResetTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ResetTokenScalarWhereInput | ResetTokenScalarWhereInput[]
  }

  export type VendeurProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<VendeurProfileCreateWithoutUserInput, VendeurProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: VendeurProfileCreateOrConnectWithoutUserInput
    upsert?: VendeurProfileUpsertWithoutUserInput
    disconnect?: VendeurProfileWhereInput | boolean
    delete?: VendeurProfileWhereInput | boolean
    connect?: VendeurProfileWhereUniqueInput
    update?: XOR<XOR<VendeurProfileUpdateToOneWithWhereWithoutUserInput, VendeurProfileUpdateWithoutUserInput>, VendeurProfileUncheckedUpdateWithoutUserInput>
  }

  export type UserCreateNestedOneWithoutVendeurProfileInput = {
    create?: XOR<UserCreateWithoutVendeurProfileInput, UserUncheckedCreateWithoutVendeurProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutVendeurProfileInput
    connect?: UserWhereUniqueInput
  }

  export type VendeurDocumentCreateNestedManyWithoutVendeurInput = {
    create?: XOR<VendeurDocumentCreateWithoutVendeurInput, VendeurDocumentUncheckedCreateWithoutVendeurInput> | VendeurDocumentCreateWithoutVendeurInput[] | VendeurDocumentUncheckedCreateWithoutVendeurInput[]
    connectOrCreate?: VendeurDocumentCreateOrConnectWithoutVendeurInput | VendeurDocumentCreateOrConnectWithoutVendeurInput[]
    createMany?: VendeurDocumentCreateManyVendeurInputEnvelope
    connect?: VendeurDocumentWhereUniqueInput | VendeurDocumentWhereUniqueInput[]
  }

  export type ProductCreateNestedManyWithoutVendeurInput = {
    create?: XOR<ProductCreateWithoutVendeurInput, ProductUncheckedCreateWithoutVendeurInput> | ProductCreateWithoutVendeurInput[] | ProductUncheckedCreateWithoutVendeurInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutVendeurInput | ProductCreateOrConnectWithoutVendeurInput[]
    createMany?: ProductCreateManyVendeurInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type CategoryCreateNestedManyWithoutVendeurInput = {
    create?: XOR<CategoryCreateWithoutVendeurInput, CategoryUncheckedCreateWithoutVendeurInput> | CategoryCreateWithoutVendeurInput[] | CategoryUncheckedCreateWithoutVendeurInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutVendeurInput | CategoryCreateOrConnectWithoutVendeurInput[]
    createMany?: CategoryCreateManyVendeurInputEnvelope
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
  }

  export type VendeurDocumentUncheckedCreateNestedManyWithoutVendeurInput = {
    create?: XOR<VendeurDocumentCreateWithoutVendeurInput, VendeurDocumentUncheckedCreateWithoutVendeurInput> | VendeurDocumentCreateWithoutVendeurInput[] | VendeurDocumentUncheckedCreateWithoutVendeurInput[]
    connectOrCreate?: VendeurDocumentCreateOrConnectWithoutVendeurInput | VendeurDocumentCreateOrConnectWithoutVendeurInput[]
    createMany?: VendeurDocumentCreateManyVendeurInputEnvelope
    connect?: VendeurDocumentWhereUniqueInput | VendeurDocumentWhereUniqueInput[]
  }

  export type ProductUncheckedCreateNestedManyWithoutVendeurInput = {
    create?: XOR<ProductCreateWithoutVendeurInput, ProductUncheckedCreateWithoutVendeurInput> | ProductCreateWithoutVendeurInput[] | ProductUncheckedCreateWithoutVendeurInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutVendeurInput | ProductCreateOrConnectWithoutVendeurInput[]
    createMany?: ProductCreateManyVendeurInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type CategoryUncheckedCreateNestedManyWithoutVendeurInput = {
    create?: XOR<CategoryCreateWithoutVendeurInput, CategoryUncheckedCreateWithoutVendeurInput> | CategoryCreateWithoutVendeurInput[] | CategoryUncheckedCreateWithoutVendeurInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutVendeurInput | CategoryCreateOrConnectWithoutVendeurInput[]
    createMany?: CategoryCreateManyVendeurInputEnvelope
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
  }

  export type EnumVendeurStatutFieldUpdateOperationsInput = {
    set?: $Enums.VendeurStatut
  }

  export type UserUpdateOneRequiredWithoutVendeurProfileNestedInput = {
    create?: XOR<UserCreateWithoutVendeurProfileInput, UserUncheckedCreateWithoutVendeurProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutVendeurProfileInput
    upsert?: UserUpsertWithoutVendeurProfileInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutVendeurProfileInput, UserUpdateWithoutVendeurProfileInput>, UserUncheckedUpdateWithoutVendeurProfileInput>
  }

  export type VendeurDocumentUpdateManyWithoutVendeurNestedInput = {
    create?: XOR<VendeurDocumentCreateWithoutVendeurInput, VendeurDocumentUncheckedCreateWithoutVendeurInput> | VendeurDocumentCreateWithoutVendeurInput[] | VendeurDocumentUncheckedCreateWithoutVendeurInput[]
    connectOrCreate?: VendeurDocumentCreateOrConnectWithoutVendeurInput | VendeurDocumentCreateOrConnectWithoutVendeurInput[]
    upsert?: VendeurDocumentUpsertWithWhereUniqueWithoutVendeurInput | VendeurDocumentUpsertWithWhereUniqueWithoutVendeurInput[]
    createMany?: VendeurDocumentCreateManyVendeurInputEnvelope
    set?: VendeurDocumentWhereUniqueInput | VendeurDocumentWhereUniqueInput[]
    disconnect?: VendeurDocumentWhereUniqueInput | VendeurDocumentWhereUniqueInput[]
    delete?: VendeurDocumentWhereUniqueInput | VendeurDocumentWhereUniqueInput[]
    connect?: VendeurDocumentWhereUniqueInput | VendeurDocumentWhereUniqueInput[]
    update?: VendeurDocumentUpdateWithWhereUniqueWithoutVendeurInput | VendeurDocumentUpdateWithWhereUniqueWithoutVendeurInput[]
    updateMany?: VendeurDocumentUpdateManyWithWhereWithoutVendeurInput | VendeurDocumentUpdateManyWithWhereWithoutVendeurInput[]
    deleteMany?: VendeurDocumentScalarWhereInput | VendeurDocumentScalarWhereInput[]
  }

  export type ProductUpdateManyWithoutVendeurNestedInput = {
    create?: XOR<ProductCreateWithoutVendeurInput, ProductUncheckedCreateWithoutVendeurInput> | ProductCreateWithoutVendeurInput[] | ProductUncheckedCreateWithoutVendeurInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutVendeurInput | ProductCreateOrConnectWithoutVendeurInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutVendeurInput | ProductUpsertWithWhereUniqueWithoutVendeurInput[]
    createMany?: ProductCreateManyVendeurInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutVendeurInput | ProductUpdateWithWhereUniqueWithoutVendeurInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutVendeurInput | ProductUpdateManyWithWhereWithoutVendeurInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type CategoryUpdateManyWithoutVendeurNestedInput = {
    create?: XOR<CategoryCreateWithoutVendeurInput, CategoryUncheckedCreateWithoutVendeurInput> | CategoryCreateWithoutVendeurInput[] | CategoryUncheckedCreateWithoutVendeurInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutVendeurInput | CategoryCreateOrConnectWithoutVendeurInput[]
    upsert?: CategoryUpsertWithWhereUniqueWithoutVendeurInput | CategoryUpsertWithWhereUniqueWithoutVendeurInput[]
    createMany?: CategoryCreateManyVendeurInputEnvelope
    set?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    disconnect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    delete?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    update?: CategoryUpdateWithWhereUniqueWithoutVendeurInput | CategoryUpdateWithWhereUniqueWithoutVendeurInput[]
    updateMany?: CategoryUpdateManyWithWhereWithoutVendeurInput | CategoryUpdateManyWithWhereWithoutVendeurInput[]
    deleteMany?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
  }

  export type VendeurDocumentUncheckedUpdateManyWithoutVendeurNestedInput = {
    create?: XOR<VendeurDocumentCreateWithoutVendeurInput, VendeurDocumentUncheckedCreateWithoutVendeurInput> | VendeurDocumentCreateWithoutVendeurInput[] | VendeurDocumentUncheckedCreateWithoutVendeurInput[]
    connectOrCreate?: VendeurDocumentCreateOrConnectWithoutVendeurInput | VendeurDocumentCreateOrConnectWithoutVendeurInput[]
    upsert?: VendeurDocumentUpsertWithWhereUniqueWithoutVendeurInput | VendeurDocumentUpsertWithWhereUniqueWithoutVendeurInput[]
    createMany?: VendeurDocumentCreateManyVendeurInputEnvelope
    set?: VendeurDocumentWhereUniqueInput | VendeurDocumentWhereUniqueInput[]
    disconnect?: VendeurDocumentWhereUniqueInput | VendeurDocumentWhereUniqueInput[]
    delete?: VendeurDocumentWhereUniqueInput | VendeurDocumentWhereUniqueInput[]
    connect?: VendeurDocumentWhereUniqueInput | VendeurDocumentWhereUniqueInput[]
    update?: VendeurDocumentUpdateWithWhereUniqueWithoutVendeurInput | VendeurDocumentUpdateWithWhereUniqueWithoutVendeurInput[]
    updateMany?: VendeurDocumentUpdateManyWithWhereWithoutVendeurInput | VendeurDocumentUpdateManyWithWhereWithoutVendeurInput[]
    deleteMany?: VendeurDocumentScalarWhereInput | VendeurDocumentScalarWhereInput[]
  }

  export type ProductUncheckedUpdateManyWithoutVendeurNestedInput = {
    create?: XOR<ProductCreateWithoutVendeurInput, ProductUncheckedCreateWithoutVendeurInput> | ProductCreateWithoutVendeurInput[] | ProductUncheckedCreateWithoutVendeurInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutVendeurInput | ProductCreateOrConnectWithoutVendeurInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutVendeurInput | ProductUpsertWithWhereUniqueWithoutVendeurInput[]
    createMany?: ProductCreateManyVendeurInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutVendeurInput | ProductUpdateWithWhereUniqueWithoutVendeurInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutVendeurInput | ProductUpdateManyWithWhereWithoutVendeurInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type CategoryUncheckedUpdateManyWithoutVendeurNestedInput = {
    create?: XOR<CategoryCreateWithoutVendeurInput, CategoryUncheckedCreateWithoutVendeurInput> | CategoryCreateWithoutVendeurInput[] | CategoryUncheckedCreateWithoutVendeurInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutVendeurInput | CategoryCreateOrConnectWithoutVendeurInput[]
    upsert?: CategoryUpsertWithWhereUniqueWithoutVendeurInput | CategoryUpsertWithWhereUniqueWithoutVendeurInput[]
    createMany?: CategoryCreateManyVendeurInputEnvelope
    set?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    disconnect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    delete?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    update?: CategoryUpdateWithWhereUniqueWithoutVendeurInput | CategoryUpdateWithWhereUniqueWithoutVendeurInput[]
    updateMany?: CategoryUpdateManyWithWhereWithoutVendeurInput | CategoryUpdateManyWithWhereWithoutVendeurInput[]
    deleteMany?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
  }

  export type VendeurProfileCreateNestedOneWithoutDocumentsInput = {
    create?: XOR<VendeurProfileCreateWithoutDocumentsInput, VendeurProfileUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: VendeurProfileCreateOrConnectWithoutDocumentsInput
    connect?: VendeurProfileWhereUniqueInput
  }

  export type EnumDocumentStatutFieldUpdateOperationsInput = {
    set?: $Enums.DocumentStatut
  }

  export type VendeurProfileUpdateOneRequiredWithoutDocumentsNestedInput = {
    create?: XOR<VendeurProfileCreateWithoutDocumentsInput, VendeurProfileUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: VendeurProfileCreateOrConnectWithoutDocumentsInput
    upsert?: VendeurProfileUpsertWithoutDocumentsInput
    connect?: VendeurProfileWhereUniqueInput
    update?: XOR<XOR<VendeurProfileUpdateToOneWithWhereWithoutDocumentsInput, VendeurProfileUpdateWithoutDocumentsInput>, VendeurProfileUncheckedUpdateWithoutDocumentsInput>
  }

  export type VendeurProfileCreateNestedOneWithoutCategoriesInput = {
    create?: XOR<VendeurProfileCreateWithoutCategoriesInput, VendeurProfileUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: VendeurProfileCreateOrConnectWithoutCategoriesInput
    connect?: VendeurProfileWhereUniqueInput
  }

  export type ProductCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type ProductUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type EnumCategoryStatutFieldUpdateOperationsInput = {
    set?: $Enums.CategoryStatut
  }

  export type VendeurProfileUpdateOneWithoutCategoriesNestedInput = {
    create?: XOR<VendeurProfileCreateWithoutCategoriesInput, VendeurProfileUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: VendeurProfileCreateOrConnectWithoutCategoriesInput
    upsert?: VendeurProfileUpsertWithoutCategoriesInput
    disconnect?: VendeurProfileWhereInput | boolean
    delete?: VendeurProfileWhereInput | boolean
    connect?: VendeurProfileWhereUniqueInput
    update?: XOR<XOR<VendeurProfileUpdateToOneWithWhereWithoutCategoriesInput, VendeurProfileUpdateWithoutCategoriesInput>, VendeurProfileUncheckedUpdateWithoutCategoriesInput>
  }

  export type ProductUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutCategoryInput | ProductUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutCategoryInput | ProductUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutCategoryInput | ProductUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type ProductUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutCategoryInput | ProductUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutCategoryInput | ProductUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutCategoryInput | ProductUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type ProductCreateimagesInput = {
    set: string[]
  }

  export type CartItemCreateNestedManyWithoutProductInput = {
    create?: XOR<CartItemCreateWithoutProductInput, CartItemUncheckedCreateWithoutProductInput> | CartItemCreateWithoutProductInput[] | CartItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: CartItemCreateOrConnectWithoutProductInput | CartItemCreateOrConnectWithoutProductInput[]
    createMany?: CartItemCreateManyProductInputEnvelope
    connect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
  }

  export type FavoriteCreateNestedManyWithoutProductInput = {
    create?: XOR<FavoriteCreateWithoutProductInput, FavoriteUncheckedCreateWithoutProductInput> | FavoriteCreateWithoutProductInput[] | FavoriteUncheckedCreateWithoutProductInput[]
    connectOrCreate?: FavoriteCreateOrConnectWithoutProductInput | FavoriteCreateOrConnectWithoutProductInput[]
    createMany?: FavoriteCreateManyProductInputEnvelope
    connect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
  }

  export type OrderItemCreateNestedManyWithoutProductInput = {
    create?: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput> | OrderItemCreateWithoutProductInput[] | OrderItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutProductInput | OrderItemCreateOrConnectWithoutProductInput[]
    createMany?: OrderItemCreateManyProductInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type CategoryCreateNestedOneWithoutProductsInput = {
    create?: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutProductsInput
    connect?: CategoryWhereUniqueInput
  }

  export type VendeurProfileCreateNestedOneWithoutProductsInput = {
    create?: XOR<VendeurProfileCreateWithoutProductsInput, VendeurProfileUncheckedCreateWithoutProductsInput>
    connectOrCreate?: VendeurProfileCreateOrConnectWithoutProductsInput
    connect?: VendeurProfileWhereUniqueInput
  }

  export type ProductVariantCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductVariantCreateWithoutProductInput, ProductVariantUncheckedCreateWithoutProductInput> | ProductVariantCreateWithoutProductInput[] | ProductVariantUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductVariantCreateOrConnectWithoutProductInput | ProductVariantCreateOrConnectWithoutProductInput[]
    createMany?: ProductVariantCreateManyProductInputEnvelope
    connect?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
  }

  export type CartItemUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<CartItemCreateWithoutProductInput, CartItemUncheckedCreateWithoutProductInput> | CartItemCreateWithoutProductInput[] | CartItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: CartItemCreateOrConnectWithoutProductInput | CartItemCreateOrConnectWithoutProductInput[]
    createMany?: CartItemCreateManyProductInputEnvelope
    connect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
  }

  export type FavoriteUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<FavoriteCreateWithoutProductInput, FavoriteUncheckedCreateWithoutProductInput> | FavoriteCreateWithoutProductInput[] | FavoriteUncheckedCreateWithoutProductInput[]
    connectOrCreate?: FavoriteCreateOrConnectWithoutProductInput | FavoriteCreateOrConnectWithoutProductInput[]
    createMany?: FavoriteCreateManyProductInputEnvelope
    connect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
  }

  export type OrderItemUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput> | OrderItemCreateWithoutProductInput[] | OrderItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutProductInput | OrderItemCreateOrConnectWithoutProductInput[]
    createMany?: OrderItemCreateManyProductInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type ProductVariantUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductVariantCreateWithoutProductInput, ProductVariantUncheckedCreateWithoutProductInput> | ProductVariantCreateWithoutProductInput[] | ProductVariantUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductVariantCreateOrConnectWithoutProductInput | ProductVariantCreateOrConnectWithoutProductInput[]
    createMany?: ProductVariantCreateManyProductInputEnvelope
    connect?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProductUpdateimagesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type CartItemUpdateManyWithoutProductNestedInput = {
    create?: XOR<CartItemCreateWithoutProductInput, CartItemUncheckedCreateWithoutProductInput> | CartItemCreateWithoutProductInput[] | CartItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: CartItemCreateOrConnectWithoutProductInput | CartItemCreateOrConnectWithoutProductInput[]
    upsert?: CartItemUpsertWithWhereUniqueWithoutProductInput | CartItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: CartItemCreateManyProductInputEnvelope
    set?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    disconnect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    delete?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    connect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    update?: CartItemUpdateWithWhereUniqueWithoutProductInput | CartItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: CartItemUpdateManyWithWhereWithoutProductInput | CartItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: CartItemScalarWhereInput | CartItemScalarWhereInput[]
  }

  export type FavoriteUpdateManyWithoutProductNestedInput = {
    create?: XOR<FavoriteCreateWithoutProductInput, FavoriteUncheckedCreateWithoutProductInput> | FavoriteCreateWithoutProductInput[] | FavoriteUncheckedCreateWithoutProductInput[]
    connectOrCreate?: FavoriteCreateOrConnectWithoutProductInput | FavoriteCreateOrConnectWithoutProductInput[]
    upsert?: FavoriteUpsertWithWhereUniqueWithoutProductInput | FavoriteUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: FavoriteCreateManyProductInputEnvelope
    set?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    disconnect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    delete?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    connect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    update?: FavoriteUpdateWithWhereUniqueWithoutProductInput | FavoriteUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: FavoriteUpdateManyWithWhereWithoutProductInput | FavoriteUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: FavoriteScalarWhereInput | FavoriteScalarWhereInput[]
  }

  export type OrderItemUpdateManyWithoutProductNestedInput = {
    create?: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput> | OrderItemCreateWithoutProductInput[] | OrderItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutProductInput | OrderItemCreateOrConnectWithoutProductInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutProductInput | OrderItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: OrderItemCreateManyProductInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutProductInput | OrderItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutProductInput | OrderItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type CategoryUpdateOneRequiredWithoutProductsNestedInput = {
    create?: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutProductsInput
    upsert?: CategoryUpsertWithoutProductsInput
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutProductsInput, CategoryUpdateWithoutProductsInput>, CategoryUncheckedUpdateWithoutProductsInput>
  }

  export type VendeurProfileUpdateOneWithoutProductsNestedInput = {
    create?: XOR<VendeurProfileCreateWithoutProductsInput, VendeurProfileUncheckedCreateWithoutProductsInput>
    connectOrCreate?: VendeurProfileCreateOrConnectWithoutProductsInput
    upsert?: VendeurProfileUpsertWithoutProductsInput
    disconnect?: VendeurProfileWhereInput | boolean
    delete?: VendeurProfileWhereInput | boolean
    connect?: VendeurProfileWhereUniqueInput
    update?: XOR<XOR<VendeurProfileUpdateToOneWithWhereWithoutProductsInput, VendeurProfileUpdateWithoutProductsInput>, VendeurProfileUncheckedUpdateWithoutProductsInput>
  }

  export type ProductVariantUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductVariantCreateWithoutProductInput, ProductVariantUncheckedCreateWithoutProductInput> | ProductVariantCreateWithoutProductInput[] | ProductVariantUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductVariantCreateOrConnectWithoutProductInput | ProductVariantCreateOrConnectWithoutProductInput[]
    upsert?: ProductVariantUpsertWithWhereUniqueWithoutProductInput | ProductVariantUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductVariantCreateManyProductInputEnvelope
    set?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
    disconnect?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
    delete?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
    connect?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
    update?: ProductVariantUpdateWithWhereUniqueWithoutProductInput | ProductVariantUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductVariantUpdateManyWithWhereWithoutProductInput | ProductVariantUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductVariantScalarWhereInput | ProductVariantScalarWhereInput[]
  }

  export type CartItemUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<CartItemCreateWithoutProductInput, CartItemUncheckedCreateWithoutProductInput> | CartItemCreateWithoutProductInput[] | CartItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: CartItemCreateOrConnectWithoutProductInput | CartItemCreateOrConnectWithoutProductInput[]
    upsert?: CartItemUpsertWithWhereUniqueWithoutProductInput | CartItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: CartItemCreateManyProductInputEnvelope
    set?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    disconnect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    delete?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    connect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    update?: CartItemUpdateWithWhereUniqueWithoutProductInput | CartItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: CartItemUpdateManyWithWhereWithoutProductInput | CartItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: CartItemScalarWhereInput | CartItemScalarWhereInput[]
  }

  export type FavoriteUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<FavoriteCreateWithoutProductInput, FavoriteUncheckedCreateWithoutProductInput> | FavoriteCreateWithoutProductInput[] | FavoriteUncheckedCreateWithoutProductInput[]
    connectOrCreate?: FavoriteCreateOrConnectWithoutProductInput | FavoriteCreateOrConnectWithoutProductInput[]
    upsert?: FavoriteUpsertWithWhereUniqueWithoutProductInput | FavoriteUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: FavoriteCreateManyProductInputEnvelope
    set?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    disconnect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    delete?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    connect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    update?: FavoriteUpdateWithWhereUniqueWithoutProductInput | FavoriteUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: FavoriteUpdateManyWithWhereWithoutProductInput | FavoriteUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: FavoriteScalarWhereInput | FavoriteScalarWhereInput[]
  }

  export type OrderItemUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput> | OrderItemCreateWithoutProductInput[] | OrderItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutProductInput | OrderItemCreateOrConnectWithoutProductInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutProductInput | OrderItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: OrderItemCreateManyProductInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutProductInput | OrderItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutProductInput | OrderItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type ProductVariantUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductVariantCreateWithoutProductInput, ProductVariantUncheckedCreateWithoutProductInput> | ProductVariantCreateWithoutProductInput[] | ProductVariantUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductVariantCreateOrConnectWithoutProductInput | ProductVariantCreateOrConnectWithoutProductInput[]
    upsert?: ProductVariantUpsertWithWhereUniqueWithoutProductInput | ProductVariantUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductVariantCreateManyProductInputEnvelope
    set?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
    disconnect?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
    delete?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
    connect?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
    update?: ProductVariantUpdateWithWhereUniqueWithoutProductInput | ProductVariantUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductVariantUpdateManyWithWhereWithoutProductInput | ProductVariantUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductVariantScalarWhereInput | ProductVariantScalarWhereInput[]
  }

  export type ProductVariantCreateimagesInput = {
    set: string[]
  }

  export type ProductCreateNestedOneWithoutVariantsInput = {
    create?: XOR<ProductCreateWithoutVariantsInput, ProductUncheckedCreateWithoutVariantsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutVariantsInput
    connect?: ProductWhereUniqueInput
  }

  export type CartItemCreateNestedManyWithoutVariantInput = {
    create?: XOR<CartItemCreateWithoutVariantInput, CartItemUncheckedCreateWithoutVariantInput> | CartItemCreateWithoutVariantInput[] | CartItemUncheckedCreateWithoutVariantInput[]
    connectOrCreate?: CartItemCreateOrConnectWithoutVariantInput | CartItemCreateOrConnectWithoutVariantInput[]
    createMany?: CartItemCreateManyVariantInputEnvelope
    connect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
  }

  export type OrderItemCreateNestedManyWithoutVariantInput = {
    create?: XOR<OrderItemCreateWithoutVariantInput, OrderItemUncheckedCreateWithoutVariantInput> | OrderItemCreateWithoutVariantInput[] | OrderItemUncheckedCreateWithoutVariantInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutVariantInput | OrderItemCreateOrConnectWithoutVariantInput[]
    createMany?: OrderItemCreateManyVariantInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type CartItemUncheckedCreateNestedManyWithoutVariantInput = {
    create?: XOR<CartItemCreateWithoutVariantInput, CartItemUncheckedCreateWithoutVariantInput> | CartItemCreateWithoutVariantInput[] | CartItemUncheckedCreateWithoutVariantInput[]
    connectOrCreate?: CartItemCreateOrConnectWithoutVariantInput | CartItemCreateOrConnectWithoutVariantInput[]
    createMany?: CartItemCreateManyVariantInputEnvelope
    connect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
  }

  export type OrderItemUncheckedCreateNestedManyWithoutVariantInput = {
    create?: XOR<OrderItemCreateWithoutVariantInput, OrderItemUncheckedCreateWithoutVariantInput> | OrderItemCreateWithoutVariantInput[] | OrderItemUncheckedCreateWithoutVariantInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutVariantInput | OrderItemCreateOrConnectWithoutVariantInput[]
    createMany?: OrderItemCreateManyVariantInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type ProductVariantUpdateimagesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ProductUpdateOneRequiredWithoutVariantsNestedInput = {
    create?: XOR<ProductCreateWithoutVariantsInput, ProductUncheckedCreateWithoutVariantsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutVariantsInput
    upsert?: ProductUpsertWithoutVariantsInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutVariantsInput, ProductUpdateWithoutVariantsInput>, ProductUncheckedUpdateWithoutVariantsInput>
  }

  export type CartItemUpdateManyWithoutVariantNestedInput = {
    create?: XOR<CartItemCreateWithoutVariantInput, CartItemUncheckedCreateWithoutVariantInput> | CartItemCreateWithoutVariantInput[] | CartItemUncheckedCreateWithoutVariantInput[]
    connectOrCreate?: CartItemCreateOrConnectWithoutVariantInput | CartItemCreateOrConnectWithoutVariantInput[]
    upsert?: CartItemUpsertWithWhereUniqueWithoutVariantInput | CartItemUpsertWithWhereUniqueWithoutVariantInput[]
    createMany?: CartItemCreateManyVariantInputEnvelope
    set?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    disconnect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    delete?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    connect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    update?: CartItemUpdateWithWhereUniqueWithoutVariantInput | CartItemUpdateWithWhereUniqueWithoutVariantInput[]
    updateMany?: CartItemUpdateManyWithWhereWithoutVariantInput | CartItemUpdateManyWithWhereWithoutVariantInput[]
    deleteMany?: CartItemScalarWhereInput | CartItemScalarWhereInput[]
  }

  export type OrderItemUpdateManyWithoutVariantNestedInput = {
    create?: XOR<OrderItemCreateWithoutVariantInput, OrderItemUncheckedCreateWithoutVariantInput> | OrderItemCreateWithoutVariantInput[] | OrderItemUncheckedCreateWithoutVariantInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutVariantInput | OrderItemCreateOrConnectWithoutVariantInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutVariantInput | OrderItemUpsertWithWhereUniqueWithoutVariantInput[]
    createMany?: OrderItemCreateManyVariantInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutVariantInput | OrderItemUpdateWithWhereUniqueWithoutVariantInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutVariantInput | OrderItemUpdateManyWithWhereWithoutVariantInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type CartItemUncheckedUpdateManyWithoutVariantNestedInput = {
    create?: XOR<CartItemCreateWithoutVariantInput, CartItemUncheckedCreateWithoutVariantInput> | CartItemCreateWithoutVariantInput[] | CartItemUncheckedCreateWithoutVariantInput[]
    connectOrCreate?: CartItemCreateOrConnectWithoutVariantInput | CartItemCreateOrConnectWithoutVariantInput[]
    upsert?: CartItemUpsertWithWhereUniqueWithoutVariantInput | CartItemUpsertWithWhereUniqueWithoutVariantInput[]
    createMany?: CartItemCreateManyVariantInputEnvelope
    set?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    disconnect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    delete?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    connect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    update?: CartItemUpdateWithWhereUniqueWithoutVariantInput | CartItemUpdateWithWhereUniqueWithoutVariantInput[]
    updateMany?: CartItemUpdateManyWithWhereWithoutVariantInput | CartItemUpdateManyWithWhereWithoutVariantInput[]
    deleteMany?: CartItemScalarWhereInput | CartItemScalarWhereInput[]
  }

  export type OrderItemUncheckedUpdateManyWithoutVariantNestedInput = {
    create?: XOR<OrderItemCreateWithoutVariantInput, OrderItemUncheckedCreateWithoutVariantInput> | OrderItemCreateWithoutVariantInput[] | OrderItemUncheckedCreateWithoutVariantInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutVariantInput | OrderItemCreateOrConnectWithoutVariantInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutVariantInput | OrderItemUpsertWithWhereUniqueWithoutVariantInput[]
    createMany?: OrderItemCreateManyVariantInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutVariantInput | OrderItemUpdateWithWhereUniqueWithoutVariantInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutVariantInput | OrderItemUpdateManyWithWhereWithoutVariantInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutCartInput = {
    create?: XOR<UserCreateWithoutCartInput, UserUncheckedCreateWithoutCartInput>
    connectOrCreate?: UserCreateOrConnectWithoutCartInput
    connect?: UserWhereUniqueInput
  }

  export type CartItemCreateNestedManyWithoutCartInput = {
    create?: XOR<CartItemCreateWithoutCartInput, CartItemUncheckedCreateWithoutCartInput> | CartItemCreateWithoutCartInput[] | CartItemUncheckedCreateWithoutCartInput[]
    connectOrCreate?: CartItemCreateOrConnectWithoutCartInput | CartItemCreateOrConnectWithoutCartInput[]
    createMany?: CartItemCreateManyCartInputEnvelope
    connect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
  }

  export type CartItemUncheckedCreateNestedManyWithoutCartInput = {
    create?: XOR<CartItemCreateWithoutCartInput, CartItemUncheckedCreateWithoutCartInput> | CartItemCreateWithoutCartInput[] | CartItemUncheckedCreateWithoutCartInput[]
    connectOrCreate?: CartItemCreateOrConnectWithoutCartInput | CartItemCreateOrConnectWithoutCartInput[]
    createMany?: CartItemCreateManyCartInputEnvelope
    connect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutCartNestedInput = {
    create?: XOR<UserCreateWithoutCartInput, UserUncheckedCreateWithoutCartInput>
    connectOrCreate?: UserCreateOrConnectWithoutCartInput
    upsert?: UserUpsertWithoutCartInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCartInput, UserUpdateWithoutCartInput>, UserUncheckedUpdateWithoutCartInput>
  }

  export type CartItemUpdateManyWithoutCartNestedInput = {
    create?: XOR<CartItemCreateWithoutCartInput, CartItemUncheckedCreateWithoutCartInput> | CartItemCreateWithoutCartInput[] | CartItemUncheckedCreateWithoutCartInput[]
    connectOrCreate?: CartItemCreateOrConnectWithoutCartInput | CartItemCreateOrConnectWithoutCartInput[]
    upsert?: CartItemUpsertWithWhereUniqueWithoutCartInput | CartItemUpsertWithWhereUniqueWithoutCartInput[]
    createMany?: CartItemCreateManyCartInputEnvelope
    set?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    disconnect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    delete?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    connect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    update?: CartItemUpdateWithWhereUniqueWithoutCartInput | CartItemUpdateWithWhereUniqueWithoutCartInput[]
    updateMany?: CartItemUpdateManyWithWhereWithoutCartInput | CartItemUpdateManyWithWhereWithoutCartInput[]
    deleteMany?: CartItemScalarWhereInput | CartItemScalarWhereInput[]
  }

  export type CartItemUncheckedUpdateManyWithoutCartNestedInput = {
    create?: XOR<CartItemCreateWithoutCartInput, CartItemUncheckedCreateWithoutCartInput> | CartItemCreateWithoutCartInput[] | CartItemUncheckedCreateWithoutCartInput[]
    connectOrCreate?: CartItemCreateOrConnectWithoutCartInput | CartItemCreateOrConnectWithoutCartInput[]
    upsert?: CartItemUpsertWithWhereUniqueWithoutCartInput | CartItemUpsertWithWhereUniqueWithoutCartInput[]
    createMany?: CartItemCreateManyCartInputEnvelope
    set?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    disconnect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    delete?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    connect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    update?: CartItemUpdateWithWhereUniqueWithoutCartInput | CartItemUpdateWithWhereUniqueWithoutCartInput[]
    updateMany?: CartItemUpdateManyWithWhereWithoutCartInput | CartItemUpdateManyWithWhereWithoutCartInput[]
    deleteMany?: CartItemScalarWhereInput | CartItemScalarWhereInput[]
  }

  export type CartCreateNestedOneWithoutItemsInput = {
    create?: XOR<CartCreateWithoutItemsInput, CartUncheckedCreateWithoutItemsInput>
    connectOrCreate?: CartCreateOrConnectWithoutItemsInput
    connect?: CartWhereUniqueInput
  }

  export type ProductCreateNestedOneWithoutCartItemsInput = {
    create?: XOR<ProductCreateWithoutCartItemsInput, ProductUncheckedCreateWithoutCartItemsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutCartItemsInput
    connect?: ProductWhereUniqueInput
  }

  export type ProductVariantCreateNestedOneWithoutCartItemsInput = {
    create?: XOR<ProductVariantCreateWithoutCartItemsInput, ProductVariantUncheckedCreateWithoutCartItemsInput>
    connectOrCreate?: ProductVariantCreateOrConnectWithoutCartItemsInput
    connect?: ProductVariantWhereUniqueInput
  }

  export type CartUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<CartCreateWithoutItemsInput, CartUncheckedCreateWithoutItemsInput>
    connectOrCreate?: CartCreateOrConnectWithoutItemsInput
    upsert?: CartUpsertWithoutItemsInput
    connect?: CartWhereUniqueInput
    update?: XOR<XOR<CartUpdateToOneWithWhereWithoutItemsInput, CartUpdateWithoutItemsInput>, CartUncheckedUpdateWithoutItemsInput>
  }

  export type ProductUpdateOneRequiredWithoutCartItemsNestedInput = {
    create?: XOR<ProductCreateWithoutCartItemsInput, ProductUncheckedCreateWithoutCartItemsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutCartItemsInput
    upsert?: ProductUpsertWithoutCartItemsInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutCartItemsInput, ProductUpdateWithoutCartItemsInput>, ProductUncheckedUpdateWithoutCartItemsInput>
  }

  export type ProductVariantUpdateOneWithoutCartItemsNestedInput = {
    create?: XOR<ProductVariantCreateWithoutCartItemsInput, ProductVariantUncheckedCreateWithoutCartItemsInput>
    connectOrCreate?: ProductVariantCreateOrConnectWithoutCartItemsInput
    upsert?: ProductVariantUpsertWithoutCartItemsInput
    disconnect?: ProductVariantWhereInput | boolean
    delete?: ProductVariantWhereInput | boolean
    connect?: ProductVariantWhereUniqueInput
    update?: XOR<XOR<ProductVariantUpdateToOneWithWhereWithoutCartItemsInput, ProductVariantUpdateWithoutCartItemsInput>, ProductVariantUncheckedUpdateWithoutCartItemsInput>
  }

  export type ProductCreateNestedOneWithoutFavoritesInput = {
    create?: XOR<ProductCreateWithoutFavoritesInput, ProductUncheckedCreateWithoutFavoritesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutFavoritesInput
    connect?: ProductWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutFavoritesInput = {
    create?: XOR<UserCreateWithoutFavoritesInput, UserUncheckedCreateWithoutFavoritesInput>
    connectOrCreate?: UserCreateOrConnectWithoutFavoritesInput
    connect?: UserWhereUniqueInput
  }

  export type ProductUpdateOneRequiredWithoutFavoritesNestedInput = {
    create?: XOR<ProductCreateWithoutFavoritesInput, ProductUncheckedCreateWithoutFavoritesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutFavoritesInput
    upsert?: ProductUpsertWithoutFavoritesInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutFavoritesInput, ProductUpdateWithoutFavoritesInput>, ProductUncheckedUpdateWithoutFavoritesInput>
  }

  export type UserUpdateOneRequiredWithoutFavoritesNestedInput = {
    create?: XOR<UserCreateWithoutFavoritesInput, UserUncheckedCreateWithoutFavoritesInput>
    connectOrCreate?: UserCreateOrConnectWithoutFavoritesInput
    upsert?: UserUpsertWithoutFavoritesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFavoritesInput, UserUpdateWithoutFavoritesInput>, UserUncheckedUpdateWithoutFavoritesInput>
  }

  export type UserCreateNestedOneWithoutOrdersInput = {
    create?: XOR<UserCreateWithoutOrdersInput, UserUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: UserCreateOrConnectWithoutOrdersInput
    connect?: UserWhereUniqueInput
  }

  export type OrderItemCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type OrderItemUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type EnumOrderStatusFieldUpdateOperationsInput = {
    set?: $Enums.OrderStatus
  }

  export type UserUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: XOR<UserCreateWithoutOrdersInput, UserUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: UserCreateOrConnectWithoutOrdersInput
    upsert?: UserUpsertWithoutOrdersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOrdersInput, UserUpdateWithoutOrdersInput>, UserUncheckedUpdateWithoutOrdersInput>
  }

  export type OrderItemUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutOrderInput | OrderItemUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutOrderInput | OrderItemUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutOrderInput | OrderItemUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type OrderItemUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutOrderInput | OrderItemUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutOrderInput | OrderItemUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutOrderInput | OrderItemUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type OrderCreateNestedOneWithoutItemsInput = {
    create?: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutItemsInput
    connect?: OrderWhereUniqueInput
  }

  export type ProductCreateNestedOneWithoutOrderItemsInput = {
    create?: XOR<ProductCreateWithoutOrderItemsInput, ProductUncheckedCreateWithoutOrderItemsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutOrderItemsInput
    connect?: ProductWhereUniqueInput
  }

  export type ProductVariantCreateNestedOneWithoutOrderItemsInput = {
    create?: XOR<ProductVariantCreateWithoutOrderItemsInput, ProductVariantUncheckedCreateWithoutOrderItemsInput>
    connectOrCreate?: ProductVariantCreateOrConnectWithoutOrderItemsInput
    connect?: ProductVariantWhereUniqueInput
  }

  export type OrderUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutItemsInput
    upsert?: OrderUpsertWithoutItemsInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutItemsInput, OrderUpdateWithoutItemsInput>, OrderUncheckedUpdateWithoutItemsInput>
  }

  export type ProductUpdateOneRequiredWithoutOrderItemsNestedInput = {
    create?: XOR<ProductCreateWithoutOrderItemsInput, ProductUncheckedCreateWithoutOrderItemsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutOrderItemsInput
    upsert?: ProductUpsertWithoutOrderItemsInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutOrderItemsInput, ProductUpdateWithoutOrderItemsInput>, ProductUncheckedUpdateWithoutOrderItemsInput>
  }

  export type ProductVariantUpdateOneWithoutOrderItemsNestedInput = {
    create?: XOR<ProductVariantCreateWithoutOrderItemsInput, ProductVariantUncheckedCreateWithoutOrderItemsInput>
    connectOrCreate?: ProductVariantCreateOrConnectWithoutOrderItemsInput
    upsert?: ProductVariantUpsertWithoutOrderItemsInput
    disconnect?: ProductVariantWhereInput | boolean
    delete?: ProductVariantWhereInput | boolean
    connect?: ProductVariantWhereUniqueInput
    update?: XOR<XOR<ProductVariantUpdateToOneWithWhereWithoutOrderItemsInput, ProductVariantUpdateWithoutOrderItemsInput>, ProductVariantUncheckedUpdateWithoutOrderItemsInput>
  }

  export type UserCreateNestedOneWithoutResetTokensInput = {
    create?: XOR<UserCreateWithoutResetTokensInput, UserUncheckedCreateWithoutResetTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutResetTokensInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutResetTokensNestedInput = {
    create?: XOR<UserCreateWithoutResetTokensInput, UserUncheckedCreateWithoutResetTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutResetTokensInput
    upsert?: UserUpsertWithoutResetTokensInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutResetTokensInput, UserUpdateWithoutResetTokensInput>, UserUncheckedUpdateWithoutResetTokensInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumGenreNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Genre | EnumGenreFieldRefInput<$PrismaModel> | null
    in?: $Enums.Genre[] | ListEnumGenreFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Genre[] | ListEnumGenreFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGenreNullableFilter<$PrismaModel> | $Enums.Genre | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumGenreNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Genre | EnumGenreFieldRefInput<$PrismaModel> | null
    in?: $Enums.Genre[] | ListEnumGenreFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Genre[] | ListEnumGenreFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGenreNullableWithAggregatesFilter<$PrismaModel> | $Enums.Genre | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumGenreNullableFilter<$PrismaModel>
    _max?: NestedEnumGenreNullableFilter<$PrismaModel>
  }

  export type NestedEnumVendeurStatutFilter<$PrismaModel = never> = {
    equals?: $Enums.VendeurStatut | EnumVendeurStatutFieldRefInput<$PrismaModel>
    in?: $Enums.VendeurStatut[] | ListEnumVendeurStatutFieldRefInput<$PrismaModel>
    notIn?: $Enums.VendeurStatut[] | ListEnumVendeurStatutFieldRefInput<$PrismaModel>
    not?: NestedEnumVendeurStatutFilter<$PrismaModel> | $Enums.VendeurStatut
  }

  export type NestedEnumVendeurStatutWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VendeurStatut | EnumVendeurStatutFieldRefInput<$PrismaModel>
    in?: $Enums.VendeurStatut[] | ListEnumVendeurStatutFieldRefInput<$PrismaModel>
    notIn?: $Enums.VendeurStatut[] | ListEnumVendeurStatutFieldRefInput<$PrismaModel>
    not?: NestedEnumVendeurStatutWithAggregatesFilter<$PrismaModel> | $Enums.VendeurStatut
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVendeurStatutFilter<$PrismaModel>
    _max?: NestedEnumVendeurStatutFilter<$PrismaModel>
  }

  export type NestedEnumDocumentStatutFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentStatut | EnumDocumentStatutFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentStatut[] | ListEnumDocumentStatutFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentStatut[] | ListEnumDocumentStatutFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentStatutFilter<$PrismaModel> | $Enums.DocumentStatut
  }

  export type NestedEnumDocumentStatutWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentStatut | EnumDocumentStatutFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentStatut[] | ListEnumDocumentStatutFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentStatut[] | ListEnumDocumentStatutFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentStatutWithAggregatesFilter<$PrismaModel> | $Enums.DocumentStatut
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDocumentStatutFilter<$PrismaModel>
    _max?: NestedEnumDocumentStatutFilter<$PrismaModel>
  }

  export type NestedEnumCategoryStatutFilter<$PrismaModel = never> = {
    equals?: $Enums.CategoryStatut | EnumCategoryStatutFieldRefInput<$PrismaModel>
    in?: $Enums.CategoryStatut[] | ListEnumCategoryStatutFieldRefInput<$PrismaModel>
    notIn?: $Enums.CategoryStatut[] | ListEnumCategoryStatutFieldRefInput<$PrismaModel>
    not?: NestedEnumCategoryStatutFilter<$PrismaModel> | $Enums.CategoryStatut
  }

  export type NestedEnumCategoryStatutWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CategoryStatut | EnumCategoryStatutFieldRefInput<$PrismaModel>
    in?: $Enums.CategoryStatut[] | ListEnumCategoryStatutFieldRefInput<$PrismaModel>
    notIn?: $Enums.CategoryStatut[] | ListEnumCategoryStatutFieldRefInput<$PrismaModel>
    not?: NestedEnumCategoryStatutWithAggregatesFilter<$PrismaModel> | $Enums.CategoryStatut
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCategoryStatutFilter<$PrismaModel>
    _max?: NestedEnumCategoryStatutFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus
  }

  export type NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>
  }

  export type CartCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: CartItemCreateNestedManyWithoutCartInput
  }

  export type CartUncheckedCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: CartItemUncheckedCreateNestedManyWithoutCartInput
  }

  export type CartCreateOrConnectWithoutUserInput = {
    where: CartWhereUniqueInput
    create: XOR<CartCreateWithoutUserInput, CartUncheckedCreateWithoutUserInput>
  }

  export type FavoriteCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    product: ProductCreateNestedOneWithoutFavoritesInput
  }

  export type FavoriteUncheckedCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    productId: string
  }

  export type FavoriteCreateOrConnectWithoutUserInput = {
    where: FavoriteWhereUniqueInput
    create: XOR<FavoriteCreateWithoutUserInput, FavoriteUncheckedCreateWithoutUserInput>
  }

  export type FavoriteCreateManyUserInputEnvelope = {
    data: FavoriteCreateManyUserInput | FavoriteCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type OrderCreateWithoutUserInput = {
    id?: string
    statut?: $Enums.OrderStatus
    total: number
    adresse: string
    modePaiement?: string
    methodeExpedition?: string
    fraisLivraison?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    scan1Done?: boolean
    scan1Result?: string | null
    scan1ShippingAllowed?: boolean
    scan2Done?: boolean
    scan2Result?: string | null
    retourDemande?: boolean
    items?: OrderItemCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutUserInput = {
    id?: string
    statut?: $Enums.OrderStatus
    total: number
    adresse: string
    modePaiement?: string
    methodeExpedition?: string
    fraisLivraison?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    scan1Done?: boolean
    scan1Result?: string | null
    scan1ShippingAllowed?: boolean
    scan2Done?: boolean
    scan2Result?: string | null
    retourDemande?: boolean
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutUserInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput>
  }

  export type OrderCreateManyUserInputEnvelope = {
    data: OrderCreateManyUserInput | OrderCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ResetTokenCreateWithoutUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    used?: boolean
    createdAt?: Date | string
    verified?: boolean
    code: string
  }

  export type ResetTokenUncheckedCreateWithoutUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    used?: boolean
    createdAt?: Date | string
    verified?: boolean
    code: string
  }

  export type ResetTokenCreateOrConnectWithoutUserInput = {
    where: ResetTokenWhereUniqueInput
    create: XOR<ResetTokenCreateWithoutUserInput, ResetTokenUncheckedCreateWithoutUserInput>
  }

  export type ResetTokenCreateManyUserInputEnvelope = {
    data: ResetTokenCreateManyUserInput | ResetTokenCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type VendeurProfileCreateWithoutUserInput = {
    id?: string
    statut?: $Enums.VendeurStatut
    nomBoutique?: string | null
    description?: string | null
    adminNote?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    flowmerceApiKey?: string | null
    documents?: VendeurDocumentCreateNestedManyWithoutVendeurInput
    products?: ProductCreateNestedManyWithoutVendeurInput
    categories?: CategoryCreateNestedManyWithoutVendeurInput
  }

  export type VendeurProfileUncheckedCreateWithoutUserInput = {
    id?: string
    statut?: $Enums.VendeurStatut
    nomBoutique?: string | null
    description?: string | null
    adminNote?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    flowmerceApiKey?: string | null
    documents?: VendeurDocumentUncheckedCreateNestedManyWithoutVendeurInput
    products?: ProductUncheckedCreateNestedManyWithoutVendeurInput
    categories?: CategoryUncheckedCreateNestedManyWithoutVendeurInput
  }

  export type VendeurProfileCreateOrConnectWithoutUserInput = {
    where: VendeurProfileWhereUniqueInput
    create: XOR<VendeurProfileCreateWithoutUserInput, VendeurProfileUncheckedCreateWithoutUserInput>
  }

  export type CartUpsertWithoutUserInput = {
    update: XOR<CartUpdateWithoutUserInput, CartUncheckedUpdateWithoutUserInput>
    create: XOR<CartCreateWithoutUserInput, CartUncheckedCreateWithoutUserInput>
    where?: CartWhereInput
  }

  export type CartUpdateToOneWithWhereWithoutUserInput = {
    where?: CartWhereInput
    data: XOR<CartUpdateWithoutUserInput, CartUncheckedUpdateWithoutUserInput>
  }

  export type CartUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: CartItemUpdateManyWithoutCartNestedInput
  }

  export type CartUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: CartItemUncheckedUpdateManyWithoutCartNestedInput
  }

  export type FavoriteUpsertWithWhereUniqueWithoutUserInput = {
    where: FavoriteWhereUniqueInput
    update: XOR<FavoriteUpdateWithoutUserInput, FavoriteUncheckedUpdateWithoutUserInput>
    create: XOR<FavoriteCreateWithoutUserInput, FavoriteUncheckedCreateWithoutUserInput>
  }

  export type FavoriteUpdateWithWhereUniqueWithoutUserInput = {
    where: FavoriteWhereUniqueInput
    data: XOR<FavoriteUpdateWithoutUserInput, FavoriteUncheckedUpdateWithoutUserInput>
  }

  export type FavoriteUpdateManyWithWhereWithoutUserInput = {
    where: FavoriteScalarWhereInput
    data: XOR<FavoriteUpdateManyMutationInput, FavoriteUncheckedUpdateManyWithoutUserInput>
  }

  export type FavoriteScalarWhereInput = {
    AND?: FavoriteScalarWhereInput | FavoriteScalarWhereInput[]
    OR?: FavoriteScalarWhereInput[]
    NOT?: FavoriteScalarWhereInput | FavoriteScalarWhereInput[]
    id?: StringFilter<"Favorite"> | string
    createdAt?: DateTimeFilter<"Favorite"> | Date | string
    userId?: StringFilter<"Favorite"> | string
    productId?: StringFilter<"Favorite"> | string
  }

  export type OrderUpsertWithWhereUniqueWithoutUserInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutUserInput, OrderUncheckedUpdateWithoutUserInput>
    create: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutUserInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutUserInput, OrderUncheckedUpdateWithoutUserInput>
  }

  export type OrderUpdateManyWithWhereWithoutUserInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutUserInput>
  }

  export type OrderScalarWhereInput = {
    AND?: OrderScalarWhereInput | OrderScalarWhereInput[]
    OR?: OrderScalarWhereInput[]
    NOT?: OrderScalarWhereInput | OrderScalarWhereInput[]
    id?: StringFilter<"Order"> | string
    statut?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    total?: FloatFilter<"Order"> | number
    adresse?: StringFilter<"Order"> | string
    modePaiement?: StringFilter<"Order"> | string
    methodeExpedition?: StringFilter<"Order"> | string
    fraisLivraison?: FloatFilter<"Order"> | number
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    userId?: StringFilter<"Order"> | string
    scan1Done?: BoolFilter<"Order"> | boolean
    scan1Result?: StringNullableFilter<"Order"> | string | null
    scan1ShippingAllowed?: BoolFilter<"Order"> | boolean
    scan2Done?: BoolFilter<"Order"> | boolean
    scan2Result?: StringNullableFilter<"Order"> | string | null
    retourDemande?: BoolFilter<"Order"> | boolean
  }

  export type ResetTokenUpsertWithWhereUniqueWithoutUserInput = {
    where: ResetTokenWhereUniqueInput
    update: XOR<ResetTokenUpdateWithoutUserInput, ResetTokenUncheckedUpdateWithoutUserInput>
    create: XOR<ResetTokenCreateWithoutUserInput, ResetTokenUncheckedCreateWithoutUserInput>
  }

  export type ResetTokenUpdateWithWhereUniqueWithoutUserInput = {
    where: ResetTokenWhereUniqueInput
    data: XOR<ResetTokenUpdateWithoutUserInput, ResetTokenUncheckedUpdateWithoutUserInput>
  }

  export type ResetTokenUpdateManyWithWhereWithoutUserInput = {
    where: ResetTokenScalarWhereInput
    data: XOR<ResetTokenUpdateManyMutationInput, ResetTokenUncheckedUpdateManyWithoutUserInput>
  }

  export type ResetTokenScalarWhereInput = {
    AND?: ResetTokenScalarWhereInput | ResetTokenScalarWhereInput[]
    OR?: ResetTokenScalarWhereInput[]
    NOT?: ResetTokenScalarWhereInput | ResetTokenScalarWhereInput[]
    id?: StringFilter<"ResetToken"> | string
    token?: StringFilter<"ResetToken"> | string
    userId?: StringFilter<"ResetToken"> | string
    expiresAt?: DateTimeFilter<"ResetToken"> | Date | string
    used?: BoolFilter<"ResetToken"> | boolean
    createdAt?: DateTimeFilter<"ResetToken"> | Date | string
    verified?: BoolFilter<"ResetToken"> | boolean
    code?: StringFilter<"ResetToken"> | string
  }

  export type VendeurProfileUpsertWithoutUserInput = {
    update: XOR<VendeurProfileUpdateWithoutUserInput, VendeurProfileUncheckedUpdateWithoutUserInput>
    create: XOR<VendeurProfileCreateWithoutUserInput, VendeurProfileUncheckedCreateWithoutUserInput>
    where?: VendeurProfileWhereInput
  }

  export type VendeurProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: VendeurProfileWhereInput
    data: XOR<VendeurProfileUpdateWithoutUserInput, VendeurProfileUncheckedUpdateWithoutUserInput>
  }

  export type VendeurProfileUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    statut?: EnumVendeurStatutFieldUpdateOperationsInput | $Enums.VendeurStatut
    nomBoutique?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    flowmerceApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: VendeurDocumentUpdateManyWithoutVendeurNestedInput
    products?: ProductUpdateManyWithoutVendeurNestedInput
    categories?: CategoryUpdateManyWithoutVendeurNestedInput
  }

  export type VendeurProfileUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    statut?: EnumVendeurStatutFieldUpdateOperationsInput | $Enums.VendeurStatut
    nomBoutique?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    flowmerceApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: VendeurDocumentUncheckedUpdateManyWithoutVendeurNestedInput
    products?: ProductUncheckedUpdateManyWithoutVendeurNestedInput
    categories?: CategoryUncheckedUpdateManyWithoutVendeurNestedInput
  }

  export type UserCreateWithoutVendeurProfileInput = {
    id?: string
    nom: string
    prenom: string
    email?: string | null
    telephone?: string | null
    motDePasse?: string | null
    role?: $Enums.Role
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    age?: number | null
    genre?: $Enums.Genre | null
    wilaya?: string | null
    cart?: CartCreateNestedOneWithoutUserInput
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    orders?: OrderCreateNestedManyWithoutUserInput
    resetTokens?: ResetTokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutVendeurProfileInput = {
    id?: string
    nom: string
    prenom: string
    email?: string | null
    telephone?: string | null
    motDePasse?: string | null
    role?: $Enums.Role
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    age?: number | null
    genre?: $Enums.Genre | null
    wilaya?: string | null
    cart?: CartUncheckedCreateNestedOneWithoutUserInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput
    resetTokens?: ResetTokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutVendeurProfileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutVendeurProfileInput, UserUncheckedCreateWithoutVendeurProfileInput>
  }

  export type VendeurDocumentCreateWithoutVendeurInput = {
    id?: string
    type: string
    label: string
    description?: string | null
    fichier?: string | null
    statut?: $Enums.DocumentStatut
    adminNote?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VendeurDocumentUncheckedCreateWithoutVendeurInput = {
    id?: string
    type: string
    label: string
    description?: string | null
    fichier?: string | null
    statut?: $Enums.DocumentStatut
    adminNote?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VendeurDocumentCreateOrConnectWithoutVendeurInput = {
    where: VendeurDocumentWhereUniqueInput
    create: XOR<VendeurDocumentCreateWithoutVendeurInput, VendeurDocumentUncheckedCreateWithoutVendeurInput>
  }

  export type VendeurDocumentCreateManyVendeurInputEnvelope = {
    data: VendeurDocumentCreateManyVendeurInput | VendeurDocumentCreateManyVendeurInput[]
    skipDuplicates?: boolean
  }

  export type ProductCreateWithoutVendeurInput = {
    id?: string
    nom: string
    description?: string | null
    prix: number
    stock?: number
    images?: ProductCreateimagesInput | string[]
    prixVariables?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    actif?: boolean
    cartItems?: CartItemCreateNestedManyWithoutProductInput
    favorites?: FavoriteCreateNestedManyWithoutProductInput
    orderItems?: OrderItemCreateNestedManyWithoutProductInput
    category: CategoryCreateNestedOneWithoutProductsInput
    variants?: ProductVariantCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutVendeurInput = {
    id?: string
    nom: string
    description?: string | null
    prix: number
    stock?: number
    images?: ProductCreateimagesInput | string[]
    prixVariables?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    categoryId: string
    actif?: boolean
    cartItems?: CartItemUncheckedCreateNestedManyWithoutProductInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutProductInput
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutProductInput
    variants?: ProductVariantUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutVendeurInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutVendeurInput, ProductUncheckedCreateWithoutVendeurInput>
  }

  export type ProductCreateManyVendeurInputEnvelope = {
    data: ProductCreateManyVendeurInput | ProductCreateManyVendeurInput[]
    skipDuplicates?: boolean
  }

  export type CategoryCreateWithoutVendeurInput = {
    id?: string
    nom: string
    description?: string | null
    image?: string | null
    statut?: $Enums.CategoryStatut
    createdAt?: Date | string
    updatedAt?: Date | string
    products?: ProductCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutVendeurInput = {
    id?: string
    nom: string
    description?: string | null
    image?: string | null
    statut?: $Enums.CategoryStatut
    createdAt?: Date | string
    updatedAt?: Date | string
    products?: ProductUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutVendeurInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutVendeurInput, CategoryUncheckedCreateWithoutVendeurInput>
  }

  export type CategoryCreateManyVendeurInputEnvelope = {
    data: CategoryCreateManyVendeurInput | CategoryCreateManyVendeurInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutVendeurProfileInput = {
    update: XOR<UserUpdateWithoutVendeurProfileInput, UserUncheckedUpdateWithoutVendeurProfileInput>
    create: XOR<UserCreateWithoutVendeurProfileInput, UserUncheckedCreateWithoutVendeurProfileInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutVendeurProfileInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutVendeurProfileInput, UserUncheckedUpdateWithoutVendeurProfileInput>
  }

  export type UserUpdateWithoutVendeurProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    motDePasse?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    genre?: NullableEnumGenreFieldUpdateOperationsInput | $Enums.Genre | null
    wilaya?: NullableStringFieldUpdateOperationsInput | string | null
    cart?: CartUpdateOneWithoutUserNestedInput
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    orders?: OrderUpdateManyWithoutUserNestedInput
    resetTokens?: ResetTokenUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutVendeurProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    motDePasse?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    genre?: NullableEnumGenreFieldUpdateOperationsInput | $Enums.Genre | null
    wilaya?: NullableStringFieldUpdateOperationsInput | string | null
    cart?: CartUncheckedUpdateOneWithoutUserNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput
    resetTokens?: ResetTokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type VendeurDocumentUpsertWithWhereUniqueWithoutVendeurInput = {
    where: VendeurDocumentWhereUniqueInput
    update: XOR<VendeurDocumentUpdateWithoutVendeurInput, VendeurDocumentUncheckedUpdateWithoutVendeurInput>
    create: XOR<VendeurDocumentCreateWithoutVendeurInput, VendeurDocumentUncheckedCreateWithoutVendeurInput>
  }

  export type VendeurDocumentUpdateWithWhereUniqueWithoutVendeurInput = {
    where: VendeurDocumentWhereUniqueInput
    data: XOR<VendeurDocumentUpdateWithoutVendeurInput, VendeurDocumentUncheckedUpdateWithoutVendeurInput>
  }

  export type VendeurDocumentUpdateManyWithWhereWithoutVendeurInput = {
    where: VendeurDocumentScalarWhereInput
    data: XOR<VendeurDocumentUpdateManyMutationInput, VendeurDocumentUncheckedUpdateManyWithoutVendeurInput>
  }

  export type VendeurDocumentScalarWhereInput = {
    AND?: VendeurDocumentScalarWhereInput | VendeurDocumentScalarWhereInput[]
    OR?: VendeurDocumentScalarWhereInput[]
    NOT?: VendeurDocumentScalarWhereInput | VendeurDocumentScalarWhereInput[]
    id?: StringFilter<"VendeurDocument"> | string
    vendeurId?: StringFilter<"VendeurDocument"> | string
    type?: StringFilter<"VendeurDocument"> | string
    label?: StringFilter<"VendeurDocument"> | string
    description?: StringNullableFilter<"VendeurDocument"> | string | null
    fichier?: StringNullableFilter<"VendeurDocument"> | string | null
    statut?: EnumDocumentStatutFilter<"VendeurDocument"> | $Enums.DocumentStatut
    adminNote?: StringNullableFilter<"VendeurDocument"> | string | null
    createdAt?: DateTimeFilter<"VendeurDocument"> | Date | string
    updatedAt?: DateTimeFilter<"VendeurDocument"> | Date | string
  }

  export type ProductUpsertWithWhereUniqueWithoutVendeurInput = {
    where: ProductWhereUniqueInput
    update: XOR<ProductUpdateWithoutVendeurInput, ProductUncheckedUpdateWithoutVendeurInput>
    create: XOR<ProductCreateWithoutVendeurInput, ProductUncheckedCreateWithoutVendeurInput>
  }

  export type ProductUpdateWithWhereUniqueWithoutVendeurInput = {
    where: ProductWhereUniqueInput
    data: XOR<ProductUpdateWithoutVendeurInput, ProductUncheckedUpdateWithoutVendeurInput>
  }

  export type ProductUpdateManyWithWhereWithoutVendeurInput = {
    where: ProductScalarWhereInput
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyWithoutVendeurInput>
  }

  export type ProductScalarWhereInput = {
    AND?: ProductScalarWhereInput | ProductScalarWhereInput[]
    OR?: ProductScalarWhereInput[]
    NOT?: ProductScalarWhereInput | ProductScalarWhereInput[]
    id?: StringFilter<"Product"> | string
    nom?: StringFilter<"Product"> | string
    description?: StringNullableFilter<"Product"> | string | null
    prix?: FloatFilter<"Product"> | number
    stock?: IntFilter<"Product"> | number
    images?: StringNullableListFilter<"Product">
    prixVariables?: JsonNullableFilter<"Product">
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    categoryId?: StringFilter<"Product"> | string
    actif?: BoolFilter<"Product"> | boolean
    vendeurId?: StringNullableFilter<"Product"> | string | null
  }

  export type CategoryUpsertWithWhereUniqueWithoutVendeurInput = {
    where: CategoryWhereUniqueInput
    update: XOR<CategoryUpdateWithoutVendeurInput, CategoryUncheckedUpdateWithoutVendeurInput>
    create: XOR<CategoryCreateWithoutVendeurInput, CategoryUncheckedCreateWithoutVendeurInput>
  }

  export type CategoryUpdateWithWhereUniqueWithoutVendeurInput = {
    where: CategoryWhereUniqueInput
    data: XOR<CategoryUpdateWithoutVendeurInput, CategoryUncheckedUpdateWithoutVendeurInput>
  }

  export type CategoryUpdateManyWithWhereWithoutVendeurInput = {
    where: CategoryScalarWhereInput
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyWithoutVendeurInput>
  }

  export type CategoryScalarWhereInput = {
    AND?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
    OR?: CategoryScalarWhereInput[]
    NOT?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
    id?: StringFilter<"Category"> | string
    nom?: StringFilter<"Category"> | string
    description?: StringNullableFilter<"Category"> | string | null
    image?: StringNullableFilter<"Category"> | string | null
    statut?: EnumCategoryStatutFilter<"Category"> | $Enums.CategoryStatut
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
    vendeurId?: StringNullableFilter<"Category"> | string | null
  }

  export type VendeurProfileCreateWithoutDocumentsInput = {
    id?: string
    statut?: $Enums.VendeurStatut
    nomBoutique?: string | null
    description?: string | null
    adminNote?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    flowmerceApiKey?: string | null
    user: UserCreateNestedOneWithoutVendeurProfileInput
    products?: ProductCreateNestedManyWithoutVendeurInput
    categories?: CategoryCreateNestedManyWithoutVendeurInput
  }

  export type VendeurProfileUncheckedCreateWithoutDocumentsInput = {
    id?: string
    userId: string
    statut?: $Enums.VendeurStatut
    nomBoutique?: string | null
    description?: string | null
    adminNote?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    flowmerceApiKey?: string | null
    products?: ProductUncheckedCreateNestedManyWithoutVendeurInput
    categories?: CategoryUncheckedCreateNestedManyWithoutVendeurInput
  }

  export type VendeurProfileCreateOrConnectWithoutDocumentsInput = {
    where: VendeurProfileWhereUniqueInput
    create: XOR<VendeurProfileCreateWithoutDocumentsInput, VendeurProfileUncheckedCreateWithoutDocumentsInput>
  }

  export type VendeurProfileUpsertWithoutDocumentsInput = {
    update: XOR<VendeurProfileUpdateWithoutDocumentsInput, VendeurProfileUncheckedUpdateWithoutDocumentsInput>
    create: XOR<VendeurProfileCreateWithoutDocumentsInput, VendeurProfileUncheckedCreateWithoutDocumentsInput>
    where?: VendeurProfileWhereInput
  }

  export type VendeurProfileUpdateToOneWithWhereWithoutDocumentsInput = {
    where?: VendeurProfileWhereInput
    data: XOR<VendeurProfileUpdateWithoutDocumentsInput, VendeurProfileUncheckedUpdateWithoutDocumentsInput>
  }

  export type VendeurProfileUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    statut?: EnumVendeurStatutFieldUpdateOperationsInput | $Enums.VendeurStatut
    nomBoutique?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    flowmerceApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutVendeurProfileNestedInput
    products?: ProductUpdateManyWithoutVendeurNestedInput
    categories?: CategoryUpdateManyWithoutVendeurNestedInput
  }

  export type VendeurProfileUncheckedUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    statut?: EnumVendeurStatutFieldUpdateOperationsInput | $Enums.VendeurStatut
    nomBoutique?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    flowmerceApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    products?: ProductUncheckedUpdateManyWithoutVendeurNestedInput
    categories?: CategoryUncheckedUpdateManyWithoutVendeurNestedInput
  }

  export type VendeurProfileCreateWithoutCategoriesInput = {
    id?: string
    statut?: $Enums.VendeurStatut
    nomBoutique?: string | null
    description?: string | null
    adminNote?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    flowmerceApiKey?: string | null
    user: UserCreateNestedOneWithoutVendeurProfileInput
    documents?: VendeurDocumentCreateNestedManyWithoutVendeurInput
    products?: ProductCreateNestedManyWithoutVendeurInput
  }

  export type VendeurProfileUncheckedCreateWithoutCategoriesInput = {
    id?: string
    userId: string
    statut?: $Enums.VendeurStatut
    nomBoutique?: string | null
    description?: string | null
    adminNote?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    flowmerceApiKey?: string | null
    documents?: VendeurDocumentUncheckedCreateNestedManyWithoutVendeurInput
    products?: ProductUncheckedCreateNestedManyWithoutVendeurInput
  }

  export type VendeurProfileCreateOrConnectWithoutCategoriesInput = {
    where: VendeurProfileWhereUniqueInput
    create: XOR<VendeurProfileCreateWithoutCategoriesInput, VendeurProfileUncheckedCreateWithoutCategoriesInput>
  }

  export type ProductCreateWithoutCategoryInput = {
    id?: string
    nom: string
    description?: string | null
    prix: number
    stock?: number
    images?: ProductCreateimagesInput | string[]
    prixVariables?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    actif?: boolean
    cartItems?: CartItemCreateNestedManyWithoutProductInput
    favorites?: FavoriteCreateNestedManyWithoutProductInput
    orderItems?: OrderItemCreateNestedManyWithoutProductInput
    vendeur?: VendeurProfileCreateNestedOneWithoutProductsInput
    variants?: ProductVariantCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutCategoryInput = {
    id?: string
    nom: string
    description?: string | null
    prix: number
    stock?: number
    images?: ProductCreateimagesInput | string[]
    prixVariables?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    actif?: boolean
    vendeurId?: string | null
    cartItems?: CartItemUncheckedCreateNestedManyWithoutProductInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutProductInput
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutProductInput
    variants?: ProductVariantUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput>
  }

  export type ProductCreateManyCategoryInputEnvelope = {
    data: ProductCreateManyCategoryInput | ProductCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type VendeurProfileUpsertWithoutCategoriesInput = {
    update: XOR<VendeurProfileUpdateWithoutCategoriesInput, VendeurProfileUncheckedUpdateWithoutCategoriesInput>
    create: XOR<VendeurProfileCreateWithoutCategoriesInput, VendeurProfileUncheckedCreateWithoutCategoriesInput>
    where?: VendeurProfileWhereInput
  }

  export type VendeurProfileUpdateToOneWithWhereWithoutCategoriesInput = {
    where?: VendeurProfileWhereInput
    data: XOR<VendeurProfileUpdateWithoutCategoriesInput, VendeurProfileUncheckedUpdateWithoutCategoriesInput>
  }

  export type VendeurProfileUpdateWithoutCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    statut?: EnumVendeurStatutFieldUpdateOperationsInput | $Enums.VendeurStatut
    nomBoutique?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    flowmerceApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutVendeurProfileNestedInput
    documents?: VendeurDocumentUpdateManyWithoutVendeurNestedInput
    products?: ProductUpdateManyWithoutVendeurNestedInput
  }

  export type VendeurProfileUncheckedUpdateWithoutCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    statut?: EnumVendeurStatutFieldUpdateOperationsInput | $Enums.VendeurStatut
    nomBoutique?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    flowmerceApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: VendeurDocumentUncheckedUpdateManyWithoutVendeurNestedInput
    products?: ProductUncheckedUpdateManyWithoutVendeurNestedInput
  }

  export type ProductUpsertWithWhereUniqueWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    update: XOR<ProductUpdateWithoutCategoryInput, ProductUncheckedUpdateWithoutCategoryInput>
    create: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput>
  }

  export type ProductUpdateWithWhereUniqueWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    data: XOR<ProductUpdateWithoutCategoryInput, ProductUncheckedUpdateWithoutCategoryInput>
  }

  export type ProductUpdateManyWithWhereWithoutCategoryInput = {
    where: ProductScalarWhereInput
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyWithoutCategoryInput>
  }

  export type CartItemCreateWithoutProductInput = {
    id?: string
    quantite?: number
    cart: CartCreateNestedOneWithoutItemsInput
    variant?: ProductVariantCreateNestedOneWithoutCartItemsInput
  }

  export type CartItemUncheckedCreateWithoutProductInput = {
    id?: string
    quantite?: number
    cartId: string
    variantId?: string | null
  }

  export type CartItemCreateOrConnectWithoutProductInput = {
    where: CartItemWhereUniqueInput
    create: XOR<CartItemCreateWithoutProductInput, CartItemUncheckedCreateWithoutProductInput>
  }

  export type CartItemCreateManyProductInputEnvelope = {
    data: CartItemCreateManyProductInput | CartItemCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type FavoriteCreateWithoutProductInput = {
    id?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutFavoritesInput
  }

  export type FavoriteUncheckedCreateWithoutProductInput = {
    id?: string
    createdAt?: Date | string
    userId: string
  }

  export type FavoriteCreateOrConnectWithoutProductInput = {
    where: FavoriteWhereUniqueInput
    create: XOR<FavoriteCreateWithoutProductInput, FavoriteUncheckedCreateWithoutProductInput>
  }

  export type FavoriteCreateManyProductInputEnvelope = {
    data: FavoriteCreateManyProductInput | FavoriteCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type OrderItemCreateWithoutProductInput = {
    id?: string
    quantite: number
    prix: number
    variantNom?: string | null
    order: OrderCreateNestedOneWithoutItemsInput
    variant?: ProductVariantCreateNestedOneWithoutOrderItemsInput
  }

  export type OrderItemUncheckedCreateWithoutProductInput = {
    id?: string
    quantite: number
    prix: number
    orderId: string
    variantId?: string | null
    variantNom?: string | null
  }

  export type OrderItemCreateOrConnectWithoutProductInput = {
    where: OrderItemWhereUniqueInput
    create: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput>
  }

  export type OrderItemCreateManyProductInputEnvelope = {
    data: OrderItemCreateManyProductInput | OrderItemCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type CategoryCreateWithoutProductsInput = {
    id?: string
    nom: string
    description?: string | null
    image?: string | null
    statut?: $Enums.CategoryStatut
    createdAt?: Date | string
    updatedAt?: Date | string
    vendeur?: VendeurProfileCreateNestedOneWithoutCategoriesInput
  }

  export type CategoryUncheckedCreateWithoutProductsInput = {
    id?: string
    nom: string
    description?: string | null
    image?: string | null
    statut?: $Enums.CategoryStatut
    createdAt?: Date | string
    updatedAt?: Date | string
    vendeurId?: string | null
  }

  export type CategoryCreateOrConnectWithoutProductsInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
  }

  export type VendeurProfileCreateWithoutProductsInput = {
    id?: string
    statut?: $Enums.VendeurStatut
    nomBoutique?: string | null
    description?: string | null
    adminNote?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    flowmerceApiKey?: string | null
    user: UserCreateNestedOneWithoutVendeurProfileInput
    documents?: VendeurDocumentCreateNestedManyWithoutVendeurInput
    categories?: CategoryCreateNestedManyWithoutVendeurInput
  }

  export type VendeurProfileUncheckedCreateWithoutProductsInput = {
    id?: string
    userId: string
    statut?: $Enums.VendeurStatut
    nomBoutique?: string | null
    description?: string | null
    adminNote?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    flowmerceApiKey?: string | null
    documents?: VendeurDocumentUncheckedCreateNestedManyWithoutVendeurInput
    categories?: CategoryUncheckedCreateNestedManyWithoutVendeurInput
  }

  export type VendeurProfileCreateOrConnectWithoutProductsInput = {
    where: VendeurProfileWhereUniqueInput
    create: XOR<VendeurProfileCreateWithoutProductsInput, VendeurProfileUncheckedCreateWithoutProductsInput>
  }

  export type ProductVariantCreateWithoutProductInput = {
    id?: string
    nom: string
    couleur?: string | null
    stock?: number
    images?: ProductVariantCreateimagesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    cartItems?: CartItemCreateNestedManyWithoutVariantInput
    orderItems?: OrderItemCreateNestedManyWithoutVariantInput
  }

  export type ProductVariantUncheckedCreateWithoutProductInput = {
    id?: string
    nom: string
    couleur?: string | null
    stock?: number
    images?: ProductVariantCreateimagesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    cartItems?: CartItemUncheckedCreateNestedManyWithoutVariantInput
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutVariantInput
  }

  export type ProductVariantCreateOrConnectWithoutProductInput = {
    where: ProductVariantWhereUniqueInput
    create: XOR<ProductVariantCreateWithoutProductInput, ProductVariantUncheckedCreateWithoutProductInput>
  }

  export type ProductVariantCreateManyProductInputEnvelope = {
    data: ProductVariantCreateManyProductInput | ProductVariantCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type CartItemUpsertWithWhereUniqueWithoutProductInput = {
    where: CartItemWhereUniqueInput
    update: XOR<CartItemUpdateWithoutProductInput, CartItemUncheckedUpdateWithoutProductInput>
    create: XOR<CartItemCreateWithoutProductInput, CartItemUncheckedCreateWithoutProductInput>
  }

  export type CartItemUpdateWithWhereUniqueWithoutProductInput = {
    where: CartItemWhereUniqueInput
    data: XOR<CartItemUpdateWithoutProductInput, CartItemUncheckedUpdateWithoutProductInput>
  }

  export type CartItemUpdateManyWithWhereWithoutProductInput = {
    where: CartItemScalarWhereInput
    data: XOR<CartItemUpdateManyMutationInput, CartItemUncheckedUpdateManyWithoutProductInput>
  }

  export type CartItemScalarWhereInput = {
    AND?: CartItemScalarWhereInput | CartItemScalarWhereInput[]
    OR?: CartItemScalarWhereInput[]
    NOT?: CartItemScalarWhereInput | CartItemScalarWhereInput[]
    id?: StringFilter<"CartItem"> | string
    quantite?: IntFilter<"CartItem"> | number
    cartId?: StringFilter<"CartItem"> | string
    productId?: StringFilter<"CartItem"> | string
    variantId?: StringNullableFilter<"CartItem"> | string | null
  }

  export type FavoriteUpsertWithWhereUniqueWithoutProductInput = {
    where: FavoriteWhereUniqueInput
    update: XOR<FavoriteUpdateWithoutProductInput, FavoriteUncheckedUpdateWithoutProductInput>
    create: XOR<FavoriteCreateWithoutProductInput, FavoriteUncheckedCreateWithoutProductInput>
  }

  export type FavoriteUpdateWithWhereUniqueWithoutProductInput = {
    where: FavoriteWhereUniqueInput
    data: XOR<FavoriteUpdateWithoutProductInput, FavoriteUncheckedUpdateWithoutProductInput>
  }

  export type FavoriteUpdateManyWithWhereWithoutProductInput = {
    where: FavoriteScalarWhereInput
    data: XOR<FavoriteUpdateManyMutationInput, FavoriteUncheckedUpdateManyWithoutProductInput>
  }

  export type OrderItemUpsertWithWhereUniqueWithoutProductInput = {
    where: OrderItemWhereUniqueInput
    update: XOR<OrderItemUpdateWithoutProductInput, OrderItemUncheckedUpdateWithoutProductInput>
    create: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput>
  }

  export type OrderItemUpdateWithWhereUniqueWithoutProductInput = {
    where: OrderItemWhereUniqueInput
    data: XOR<OrderItemUpdateWithoutProductInput, OrderItemUncheckedUpdateWithoutProductInput>
  }

  export type OrderItemUpdateManyWithWhereWithoutProductInput = {
    where: OrderItemScalarWhereInput
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyWithoutProductInput>
  }

  export type OrderItemScalarWhereInput = {
    AND?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
    OR?: OrderItemScalarWhereInput[]
    NOT?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
    id?: StringFilter<"OrderItem"> | string
    quantite?: IntFilter<"OrderItem"> | number
    prix?: FloatFilter<"OrderItem"> | number
    orderId?: StringFilter<"OrderItem"> | string
    productId?: StringFilter<"OrderItem"> | string
    variantId?: StringNullableFilter<"OrderItem"> | string | null
    variantNom?: StringNullableFilter<"OrderItem"> | string | null
  }

  export type CategoryUpsertWithoutProductsInput = {
    update: XOR<CategoryUpdateWithoutProductsInput, CategoryUncheckedUpdateWithoutProductsInput>
    create: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutProductsInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutProductsInput, CategoryUncheckedUpdateWithoutProductsInput>
  }

  export type CategoryUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumCategoryStatutFieldUpdateOperationsInput | $Enums.CategoryStatut
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vendeur?: VendeurProfileUpdateOneWithoutCategoriesNestedInput
  }

  export type CategoryUncheckedUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumCategoryStatutFieldUpdateOperationsInput | $Enums.CategoryStatut
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vendeurId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type VendeurProfileUpsertWithoutProductsInput = {
    update: XOR<VendeurProfileUpdateWithoutProductsInput, VendeurProfileUncheckedUpdateWithoutProductsInput>
    create: XOR<VendeurProfileCreateWithoutProductsInput, VendeurProfileUncheckedCreateWithoutProductsInput>
    where?: VendeurProfileWhereInput
  }

  export type VendeurProfileUpdateToOneWithWhereWithoutProductsInput = {
    where?: VendeurProfileWhereInput
    data: XOR<VendeurProfileUpdateWithoutProductsInput, VendeurProfileUncheckedUpdateWithoutProductsInput>
  }

  export type VendeurProfileUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    statut?: EnumVendeurStatutFieldUpdateOperationsInput | $Enums.VendeurStatut
    nomBoutique?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    flowmerceApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutVendeurProfileNestedInput
    documents?: VendeurDocumentUpdateManyWithoutVendeurNestedInput
    categories?: CategoryUpdateManyWithoutVendeurNestedInput
  }

  export type VendeurProfileUncheckedUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    statut?: EnumVendeurStatutFieldUpdateOperationsInput | $Enums.VendeurStatut
    nomBoutique?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    flowmerceApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: VendeurDocumentUncheckedUpdateManyWithoutVendeurNestedInput
    categories?: CategoryUncheckedUpdateManyWithoutVendeurNestedInput
  }

  export type ProductVariantUpsertWithWhereUniqueWithoutProductInput = {
    where: ProductVariantWhereUniqueInput
    update: XOR<ProductVariantUpdateWithoutProductInput, ProductVariantUncheckedUpdateWithoutProductInput>
    create: XOR<ProductVariantCreateWithoutProductInput, ProductVariantUncheckedCreateWithoutProductInput>
  }

  export type ProductVariantUpdateWithWhereUniqueWithoutProductInput = {
    where: ProductVariantWhereUniqueInput
    data: XOR<ProductVariantUpdateWithoutProductInput, ProductVariantUncheckedUpdateWithoutProductInput>
  }

  export type ProductVariantUpdateManyWithWhereWithoutProductInput = {
    where: ProductVariantScalarWhereInput
    data: XOR<ProductVariantUpdateManyMutationInput, ProductVariantUncheckedUpdateManyWithoutProductInput>
  }

  export type ProductVariantScalarWhereInput = {
    AND?: ProductVariantScalarWhereInput | ProductVariantScalarWhereInput[]
    OR?: ProductVariantScalarWhereInput[]
    NOT?: ProductVariantScalarWhereInput | ProductVariantScalarWhereInput[]
    id?: StringFilter<"ProductVariant"> | string
    productId?: StringFilter<"ProductVariant"> | string
    nom?: StringFilter<"ProductVariant"> | string
    couleur?: StringNullableFilter<"ProductVariant"> | string | null
    stock?: IntFilter<"ProductVariant"> | number
    images?: StringNullableListFilter<"ProductVariant">
    createdAt?: DateTimeFilter<"ProductVariant"> | Date | string
    updatedAt?: DateTimeFilter<"ProductVariant"> | Date | string
  }

  export type ProductCreateWithoutVariantsInput = {
    id?: string
    nom: string
    description?: string | null
    prix: number
    stock?: number
    images?: ProductCreateimagesInput | string[]
    prixVariables?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    actif?: boolean
    cartItems?: CartItemCreateNestedManyWithoutProductInput
    favorites?: FavoriteCreateNestedManyWithoutProductInput
    orderItems?: OrderItemCreateNestedManyWithoutProductInput
    category: CategoryCreateNestedOneWithoutProductsInput
    vendeur?: VendeurProfileCreateNestedOneWithoutProductsInput
  }

  export type ProductUncheckedCreateWithoutVariantsInput = {
    id?: string
    nom: string
    description?: string | null
    prix: number
    stock?: number
    images?: ProductCreateimagesInput | string[]
    prixVariables?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    categoryId: string
    actif?: boolean
    vendeurId?: string | null
    cartItems?: CartItemUncheckedCreateNestedManyWithoutProductInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutProductInput
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutVariantsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutVariantsInput, ProductUncheckedCreateWithoutVariantsInput>
  }

  export type CartItemCreateWithoutVariantInput = {
    id?: string
    quantite?: number
    cart: CartCreateNestedOneWithoutItemsInput
    product: ProductCreateNestedOneWithoutCartItemsInput
  }

  export type CartItemUncheckedCreateWithoutVariantInput = {
    id?: string
    quantite?: number
    cartId: string
    productId: string
  }

  export type CartItemCreateOrConnectWithoutVariantInput = {
    where: CartItemWhereUniqueInput
    create: XOR<CartItemCreateWithoutVariantInput, CartItemUncheckedCreateWithoutVariantInput>
  }

  export type CartItemCreateManyVariantInputEnvelope = {
    data: CartItemCreateManyVariantInput | CartItemCreateManyVariantInput[]
    skipDuplicates?: boolean
  }

  export type OrderItemCreateWithoutVariantInput = {
    id?: string
    quantite: number
    prix: number
    variantNom?: string | null
    order: OrderCreateNestedOneWithoutItemsInput
    product: ProductCreateNestedOneWithoutOrderItemsInput
  }

  export type OrderItemUncheckedCreateWithoutVariantInput = {
    id?: string
    quantite: number
    prix: number
    orderId: string
    productId: string
    variantNom?: string | null
  }

  export type OrderItemCreateOrConnectWithoutVariantInput = {
    where: OrderItemWhereUniqueInput
    create: XOR<OrderItemCreateWithoutVariantInput, OrderItemUncheckedCreateWithoutVariantInput>
  }

  export type OrderItemCreateManyVariantInputEnvelope = {
    data: OrderItemCreateManyVariantInput | OrderItemCreateManyVariantInput[]
    skipDuplicates?: boolean
  }

  export type ProductUpsertWithoutVariantsInput = {
    update: XOR<ProductUpdateWithoutVariantsInput, ProductUncheckedUpdateWithoutVariantsInput>
    create: XOR<ProductCreateWithoutVariantsInput, ProductUncheckedCreateWithoutVariantsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutVariantsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutVariantsInput, ProductUncheckedUpdateWithoutVariantsInput>
  }

  export type ProductUpdateWithoutVariantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    prix?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    images?: ProductUpdateimagesInput | string[]
    prixVariables?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actif?: BoolFieldUpdateOperationsInput | boolean
    cartItems?: CartItemUpdateManyWithoutProductNestedInput
    favorites?: FavoriteUpdateManyWithoutProductNestedInput
    orderItems?: OrderItemUpdateManyWithoutProductNestedInput
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
    vendeur?: VendeurProfileUpdateOneWithoutProductsNestedInput
  }

  export type ProductUncheckedUpdateWithoutVariantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    prix?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    images?: ProductUpdateimagesInput | string[]
    prixVariables?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: StringFieldUpdateOperationsInput | string
    actif?: BoolFieldUpdateOperationsInput | boolean
    vendeurId?: NullableStringFieldUpdateOperationsInput | string | null
    cartItems?: CartItemUncheckedUpdateManyWithoutProductNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutProductNestedInput
    orderItems?: OrderItemUncheckedUpdateManyWithoutProductNestedInput
  }

  export type CartItemUpsertWithWhereUniqueWithoutVariantInput = {
    where: CartItemWhereUniqueInput
    update: XOR<CartItemUpdateWithoutVariantInput, CartItemUncheckedUpdateWithoutVariantInput>
    create: XOR<CartItemCreateWithoutVariantInput, CartItemUncheckedCreateWithoutVariantInput>
  }

  export type CartItemUpdateWithWhereUniqueWithoutVariantInput = {
    where: CartItemWhereUniqueInput
    data: XOR<CartItemUpdateWithoutVariantInput, CartItemUncheckedUpdateWithoutVariantInput>
  }

  export type CartItemUpdateManyWithWhereWithoutVariantInput = {
    where: CartItemScalarWhereInput
    data: XOR<CartItemUpdateManyMutationInput, CartItemUncheckedUpdateManyWithoutVariantInput>
  }

  export type OrderItemUpsertWithWhereUniqueWithoutVariantInput = {
    where: OrderItemWhereUniqueInput
    update: XOR<OrderItemUpdateWithoutVariantInput, OrderItemUncheckedUpdateWithoutVariantInput>
    create: XOR<OrderItemCreateWithoutVariantInput, OrderItemUncheckedCreateWithoutVariantInput>
  }

  export type OrderItemUpdateWithWhereUniqueWithoutVariantInput = {
    where: OrderItemWhereUniqueInput
    data: XOR<OrderItemUpdateWithoutVariantInput, OrderItemUncheckedUpdateWithoutVariantInput>
  }

  export type OrderItemUpdateManyWithWhereWithoutVariantInput = {
    where: OrderItemScalarWhereInput
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyWithoutVariantInput>
  }

  export type UserCreateWithoutCartInput = {
    id?: string
    nom: string
    prenom: string
    email?: string | null
    telephone?: string | null
    motDePasse?: string | null
    role?: $Enums.Role
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    age?: number | null
    genre?: $Enums.Genre | null
    wilaya?: string | null
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    orders?: OrderCreateNestedManyWithoutUserInput
    resetTokens?: ResetTokenCreateNestedManyWithoutUserInput
    vendeurProfile?: VendeurProfileCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCartInput = {
    id?: string
    nom: string
    prenom: string
    email?: string | null
    telephone?: string | null
    motDePasse?: string | null
    role?: $Enums.Role
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    age?: number | null
    genre?: $Enums.Genre | null
    wilaya?: string | null
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput
    resetTokens?: ResetTokenUncheckedCreateNestedManyWithoutUserInput
    vendeurProfile?: VendeurProfileUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCartInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCartInput, UserUncheckedCreateWithoutCartInput>
  }

  export type CartItemCreateWithoutCartInput = {
    id?: string
    quantite?: number
    product: ProductCreateNestedOneWithoutCartItemsInput
    variant?: ProductVariantCreateNestedOneWithoutCartItemsInput
  }

  export type CartItemUncheckedCreateWithoutCartInput = {
    id?: string
    quantite?: number
    productId: string
    variantId?: string | null
  }

  export type CartItemCreateOrConnectWithoutCartInput = {
    where: CartItemWhereUniqueInput
    create: XOR<CartItemCreateWithoutCartInput, CartItemUncheckedCreateWithoutCartInput>
  }

  export type CartItemCreateManyCartInputEnvelope = {
    data: CartItemCreateManyCartInput | CartItemCreateManyCartInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCartInput = {
    update: XOR<UserUpdateWithoutCartInput, UserUncheckedUpdateWithoutCartInput>
    create: XOR<UserCreateWithoutCartInput, UserUncheckedCreateWithoutCartInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCartInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCartInput, UserUncheckedUpdateWithoutCartInput>
  }

  export type UserUpdateWithoutCartInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    motDePasse?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    genre?: NullableEnumGenreFieldUpdateOperationsInput | $Enums.Genre | null
    wilaya?: NullableStringFieldUpdateOperationsInput | string | null
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    orders?: OrderUpdateManyWithoutUserNestedInput
    resetTokens?: ResetTokenUpdateManyWithoutUserNestedInput
    vendeurProfile?: VendeurProfileUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCartInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    motDePasse?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    genre?: NullableEnumGenreFieldUpdateOperationsInput | $Enums.Genre | null
    wilaya?: NullableStringFieldUpdateOperationsInput | string | null
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput
    resetTokens?: ResetTokenUncheckedUpdateManyWithoutUserNestedInput
    vendeurProfile?: VendeurProfileUncheckedUpdateOneWithoutUserNestedInput
  }

  export type CartItemUpsertWithWhereUniqueWithoutCartInput = {
    where: CartItemWhereUniqueInput
    update: XOR<CartItemUpdateWithoutCartInput, CartItemUncheckedUpdateWithoutCartInput>
    create: XOR<CartItemCreateWithoutCartInput, CartItemUncheckedCreateWithoutCartInput>
  }

  export type CartItemUpdateWithWhereUniqueWithoutCartInput = {
    where: CartItemWhereUniqueInput
    data: XOR<CartItemUpdateWithoutCartInput, CartItemUncheckedUpdateWithoutCartInput>
  }

  export type CartItemUpdateManyWithWhereWithoutCartInput = {
    where: CartItemScalarWhereInput
    data: XOR<CartItemUpdateManyMutationInput, CartItemUncheckedUpdateManyWithoutCartInput>
  }

  export type CartCreateWithoutItemsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCartInput
  }

  export type CartUncheckedCreateWithoutItemsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type CartCreateOrConnectWithoutItemsInput = {
    where: CartWhereUniqueInput
    create: XOR<CartCreateWithoutItemsInput, CartUncheckedCreateWithoutItemsInput>
  }

  export type ProductCreateWithoutCartItemsInput = {
    id?: string
    nom: string
    description?: string | null
    prix: number
    stock?: number
    images?: ProductCreateimagesInput | string[]
    prixVariables?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    actif?: boolean
    favorites?: FavoriteCreateNestedManyWithoutProductInput
    orderItems?: OrderItemCreateNestedManyWithoutProductInput
    category: CategoryCreateNestedOneWithoutProductsInput
    vendeur?: VendeurProfileCreateNestedOneWithoutProductsInput
    variants?: ProductVariantCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutCartItemsInput = {
    id?: string
    nom: string
    description?: string | null
    prix: number
    stock?: number
    images?: ProductCreateimagesInput | string[]
    prixVariables?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    categoryId: string
    actif?: boolean
    vendeurId?: string | null
    favorites?: FavoriteUncheckedCreateNestedManyWithoutProductInput
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutProductInput
    variants?: ProductVariantUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutCartItemsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutCartItemsInput, ProductUncheckedCreateWithoutCartItemsInput>
  }

  export type ProductVariantCreateWithoutCartItemsInput = {
    id?: string
    nom: string
    couleur?: string | null
    stock?: number
    images?: ProductVariantCreateimagesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutVariantsInput
    orderItems?: OrderItemCreateNestedManyWithoutVariantInput
  }

  export type ProductVariantUncheckedCreateWithoutCartItemsInput = {
    id?: string
    productId: string
    nom: string
    couleur?: string | null
    stock?: number
    images?: ProductVariantCreateimagesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutVariantInput
  }

  export type ProductVariantCreateOrConnectWithoutCartItemsInput = {
    where: ProductVariantWhereUniqueInput
    create: XOR<ProductVariantCreateWithoutCartItemsInput, ProductVariantUncheckedCreateWithoutCartItemsInput>
  }

  export type CartUpsertWithoutItemsInput = {
    update: XOR<CartUpdateWithoutItemsInput, CartUncheckedUpdateWithoutItemsInput>
    create: XOR<CartCreateWithoutItemsInput, CartUncheckedCreateWithoutItemsInput>
    where?: CartWhereInput
  }

  export type CartUpdateToOneWithWhereWithoutItemsInput = {
    where?: CartWhereInput
    data: XOR<CartUpdateWithoutItemsInput, CartUncheckedUpdateWithoutItemsInput>
  }

  export type CartUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCartNestedInput
  }

  export type CartUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type ProductUpsertWithoutCartItemsInput = {
    update: XOR<ProductUpdateWithoutCartItemsInput, ProductUncheckedUpdateWithoutCartItemsInput>
    create: XOR<ProductCreateWithoutCartItemsInput, ProductUncheckedCreateWithoutCartItemsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutCartItemsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutCartItemsInput, ProductUncheckedUpdateWithoutCartItemsInput>
  }

  export type ProductUpdateWithoutCartItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    prix?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    images?: ProductUpdateimagesInput | string[]
    prixVariables?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actif?: BoolFieldUpdateOperationsInput | boolean
    favorites?: FavoriteUpdateManyWithoutProductNestedInput
    orderItems?: OrderItemUpdateManyWithoutProductNestedInput
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
    vendeur?: VendeurProfileUpdateOneWithoutProductsNestedInput
    variants?: ProductVariantUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutCartItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    prix?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    images?: ProductUpdateimagesInput | string[]
    prixVariables?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: StringFieldUpdateOperationsInput | string
    actif?: BoolFieldUpdateOperationsInput | boolean
    vendeurId?: NullableStringFieldUpdateOperationsInput | string | null
    favorites?: FavoriteUncheckedUpdateManyWithoutProductNestedInput
    orderItems?: OrderItemUncheckedUpdateManyWithoutProductNestedInput
    variants?: ProductVariantUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductVariantUpsertWithoutCartItemsInput = {
    update: XOR<ProductVariantUpdateWithoutCartItemsInput, ProductVariantUncheckedUpdateWithoutCartItemsInput>
    create: XOR<ProductVariantCreateWithoutCartItemsInput, ProductVariantUncheckedCreateWithoutCartItemsInput>
    where?: ProductVariantWhereInput
  }

  export type ProductVariantUpdateToOneWithWhereWithoutCartItemsInput = {
    where?: ProductVariantWhereInput
    data: XOR<ProductVariantUpdateWithoutCartItemsInput, ProductVariantUncheckedUpdateWithoutCartItemsInput>
  }

  export type ProductVariantUpdateWithoutCartItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    couleur?: NullableStringFieldUpdateOperationsInput | string | null
    stock?: IntFieldUpdateOperationsInput | number
    images?: ProductVariantUpdateimagesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutVariantsNestedInput
    orderItems?: OrderItemUpdateManyWithoutVariantNestedInput
  }

  export type ProductVariantUncheckedUpdateWithoutCartItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    couleur?: NullableStringFieldUpdateOperationsInput | string | null
    stock?: IntFieldUpdateOperationsInput | number
    images?: ProductVariantUpdateimagesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderItems?: OrderItemUncheckedUpdateManyWithoutVariantNestedInput
  }

  export type ProductCreateWithoutFavoritesInput = {
    id?: string
    nom: string
    description?: string | null
    prix: number
    stock?: number
    images?: ProductCreateimagesInput | string[]
    prixVariables?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    actif?: boolean
    cartItems?: CartItemCreateNestedManyWithoutProductInput
    orderItems?: OrderItemCreateNestedManyWithoutProductInput
    category: CategoryCreateNestedOneWithoutProductsInput
    vendeur?: VendeurProfileCreateNestedOneWithoutProductsInput
    variants?: ProductVariantCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutFavoritesInput = {
    id?: string
    nom: string
    description?: string | null
    prix: number
    stock?: number
    images?: ProductCreateimagesInput | string[]
    prixVariables?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    categoryId: string
    actif?: boolean
    vendeurId?: string | null
    cartItems?: CartItemUncheckedCreateNestedManyWithoutProductInput
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutProductInput
    variants?: ProductVariantUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutFavoritesInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutFavoritesInput, ProductUncheckedCreateWithoutFavoritesInput>
  }

  export type UserCreateWithoutFavoritesInput = {
    id?: string
    nom: string
    prenom: string
    email?: string | null
    telephone?: string | null
    motDePasse?: string | null
    role?: $Enums.Role
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    age?: number | null
    genre?: $Enums.Genre | null
    wilaya?: string | null
    cart?: CartCreateNestedOneWithoutUserInput
    orders?: OrderCreateNestedManyWithoutUserInput
    resetTokens?: ResetTokenCreateNestedManyWithoutUserInput
    vendeurProfile?: VendeurProfileCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFavoritesInput = {
    id?: string
    nom: string
    prenom: string
    email?: string | null
    telephone?: string | null
    motDePasse?: string | null
    role?: $Enums.Role
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    age?: number | null
    genre?: $Enums.Genre | null
    wilaya?: string | null
    cart?: CartUncheckedCreateNestedOneWithoutUserInput
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput
    resetTokens?: ResetTokenUncheckedCreateNestedManyWithoutUserInput
    vendeurProfile?: VendeurProfileUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFavoritesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFavoritesInput, UserUncheckedCreateWithoutFavoritesInput>
  }

  export type ProductUpsertWithoutFavoritesInput = {
    update: XOR<ProductUpdateWithoutFavoritesInput, ProductUncheckedUpdateWithoutFavoritesInput>
    create: XOR<ProductCreateWithoutFavoritesInput, ProductUncheckedCreateWithoutFavoritesInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutFavoritesInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutFavoritesInput, ProductUncheckedUpdateWithoutFavoritesInput>
  }

  export type ProductUpdateWithoutFavoritesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    prix?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    images?: ProductUpdateimagesInput | string[]
    prixVariables?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actif?: BoolFieldUpdateOperationsInput | boolean
    cartItems?: CartItemUpdateManyWithoutProductNestedInput
    orderItems?: OrderItemUpdateManyWithoutProductNestedInput
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
    vendeur?: VendeurProfileUpdateOneWithoutProductsNestedInput
    variants?: ProductVariantUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutFavoritesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    prix?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    images?: ProductUpdateimagesInput | string[]
    prixVariables?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: StringFieldUpdateOperationsInput | string
    actif?: BoolFieldUpdateOperationsInput | boolean
    vendeurId?: NullableStringFieldUpdateOperationsInput | string | null
    cartItems?: CartItemUncheckedUpdateManyWithoutProductNestedInput
    orderItems?: OrderItemUncheckedUpdateManyWithoutProductNestedInput
    variants?: ProductVariantUncheckedUpdateManyWithoutProductNestedInput
  }

  export type UserUpsertWithoutFavoritesInput = {
    update: XOR<UserUpdateWithoutFavoritesInput, UserUncheckedUpdateWithoutFavoritesInput>
    create: XOR<UserCreateWithoutFavoritesInput, UserUncheckedCreateWithoutFavoritesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFavoritesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFavoritesInput, UserUncheckedUpdateWithoutFavoritesInput>
  }

  export type UserUpdateWithoutFavoritesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    motDePasse?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    genre?: NullableEnumGenreFieldUpdateOperationsInput | $Enums.Genre | null
    wilaya?: NullableStringFieldUpdateOperationsInput | string | null
    cart?: CartUpdateOneWithoutUserNestedInput
    orders?: OrderUpdateManyWithoutUserNestedInput
    resetTokens?: ResetTokenUpdateManyWithoutUserNestedInput
    vendeurProfile?: VendeurProfileUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFavoritesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    motDePasse?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    genre?: NullableEnumGenreFieldUpdateOperationsInput | $Enums.Genre | null
    wilaya?: NullableStringFieldUpdateOperationsInput | string | null
    cart?: CartUncheckedUpdateOneWithoutUserNestedInput
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput
    resetTokens?: ResetTokenUncheckedUpdateManyWithoutUserNestedInput
    vendeurProfile?: VendeurProfileUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateWithoutOrdersInput = {
    id?: string
    nom: string
    prenom: string
    email?: string | null
    telephone?: string | null
    motDePasse?: string | null
    role?: $Enums.Role
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    age?: number | null
    genre?: $Enums.Genre | null
    wilaya?: string | null
    cart?: CartCreateNestedOneWithoutUserInput
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    resetTokens?: ResetTokenCreateNestedManyWithoutUserInput
    vendeurProfile?: VendeurProfileCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOrdersInput = {
    id?: string
    nom: string
    prenom: string
    email?: string | null
    telephone?: string | null
    motDePasse?: string | null
    role?: $Enums.Role
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    age?: number | null
    genre?: $Enums.Genre | null
    wilaya?: string | null
    cart?: CartUncheckedCreateNestedOneWithoutUserInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    resetTokens?: ResetTokenUncheckedCreateNestedManyWithoutUserInput
    vendeurProfile?: VendeurProfileUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOrdersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOrdersInput, UserUncheckedCreateWithoutOrdersInput>
  }

  export type OrderItemCreateWithoutOrderInput = {
    id?: string
    quantite: number
    prix: number
    variantNom?: string | null
    product: ProductCreateNestedOneWithoutOrderItemsInput
    variant?: ProductVariantCreateNestedOneWithoutOrderItemsInput
  }

  export type OrderItemUncheckedCreateWithoutOrderInput = {
    id?: string
    quantite: number
    prix: number
    productId: string
    variantId?: string | null
    variantNom?: string | null
  }

  export type OrderItemCreateOrConnectWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    create: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput>
  }

  export type OrderItemCreateManyOrderInputEnvelope = {
    data: OrderItemCreateManyOrderInput | OrderItemCreateManyOrderInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutOrdersInput = {
    update: XOR<UserUpdateWithoutOrdersInput, UserUncheckedUpdateWithoutOrdersInput>
    create: XOR<UserCreateWithoutOrdersInput, UserUncheckedCreateWithoutOrdersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOrdersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOrdersInput, UserUncheckedUpdateWithoutOrdersInput>
  }

  export type UserUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    motDePasse?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    genre?: NullableEnumGenreFieldUpdateOperationsInput | $Enums.Genre | null
    wilaya?: NullableStringFieldUpdateOperationsInput | string | null
    cart?: CartUpdateOneWithoutUserNestedInput
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    resetTokens?: ResetTokenUpdateManyWithoutUserNestedInput
    vendeurProfile?: VendeurProfileUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    motDePasse?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    genre?: NullableEnumGenreFieldUpdateOperationsInput | $Enums.Genre | null
    wilaya?: NullableStringFieldUpdateOperationsInput | string | null
    cart?: CartUncheckedUpdateOneWithoutUserNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    resetTokens?: ResetTokenUncheckedUpdateManyWithoutUserNestedInput
    vendeurProfile?: VendeurProfileUncheckedUpdateOneWithoutUserNestedInput
  }

  export type OrderItemUpsertWithWhereUniqueWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    update: XOR<OrderItemUpdateWithoutOrderInput, OrderItemUncheckedUpdateWithoutOrderInput>
    create: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput>
  }

  export type OrderItemUpdateWithWhereUniqueWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    data: XOR<OrderItemUpdateWithoutOrderInput, OrderItemUncheckedUpdateWithoutOrderInput>
  }

  export type OrderItemUpdateManyWithWhereWithoutOrderInput = {
    where: OrderItemScalarWhereInput
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyWithoutOrderInput>
  }

  export type OrderCreateWithoutItemsInput = {
    id?: string
    statut?: $Enums.OrderStatus
    total: number
    adresse: string
    modePaiement?: string
    methodeExpedition?: string
    fraisLivraison?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    scan1Done?: boolean
    scan1Result?: string | null
    scan1ShippingAllowed?: boolean
    scan2Done?: boolean
    scan2Result?: string | null
    retourDemande?: boolean
    user: UserCreateNestedOneWithoutOrdersInput
  }

  export type OrderUncheckedCreateWithoutItemsInput = {
    id?: string
    statut?: $Enums.OrderStatus
    total: number
    adresse: string
    modePaiement?: string
    methodeExpedition?: string
    fraisLivraison?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    scan1Done?: boolean
    scan1Result?: string | null
    scan1ShippingAllowed?: boolean
    scan2Done?: boolean
    scan2Result?: string | null
    retourDemande?: boolean
  }

  export type OrderCreateOrConnectWithoutItemsInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
  }

  export type ProductCreateWithoutOrderItemsInput = {
    id?: string
    nom: string
    description?: string | null
    prix: number
    stock?: number
    images?: ProductCreateimagesInput | string[]
    prixVariables?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    actif?: boolean
    cartItems?: CartItemCreateNestedManyWithoutProductInput
    favorites?: FavoriteCreateNestedManyWithoutProductInput
    category: CategoryCreateNestedOneWithoutProductsInput
    vendeur?: VendeurProfileCreateNestedOneWithoutProductsInput
    variants?: ProductVariantCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutOrderItemsInput = {
    id?: string
    nom: string
    description?: string | null
    prix: number
    stock?: number
    images?: ProductCreateimagesInput | string[]
    prixVariables?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    categoryId: string
    actif?: boolean
    vendeurId?: string | null
    cartItems?: CartItemUncheckedCreateNestedManyWithoutProductInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutProductInput
    variants?: ProductVariantUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutOrderItemsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutOrderItemsInput, ProductUncheckedCreateWithoutOrderItemsInput>
  }

  export type ProductVariantCreateWithoutOrderItemsInput = {
    id?: string
    nom: string
    couleur?: string | null
    stock?: number
    images?: ProductVariantCreateimagesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutVariantsInput
    cartItems?: CartItemCreateNestedManyWithoutVariantInput
  }

  export type ProductVariantUncheckedCreateWithoutOrderItemsInput = {
    id?: string
    productId: string
    nom: string
    couleur?: string | null
    stock?: number
    images?: ProductVariantCreateimagesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    cartItems?: CartItemUncheckedCreateNestedManyWithoutVariantInput
  }

  export type ProductVariantCreateOrConnectWithoutOrderItemsInput = {
    where: ProductVariantWhereUniqueInput
    create: XOR<ProductVariantCreateWithoutOrderItemsInput, ProductVariantUncheckedCreateWithoutOrderItemsInput>
  }

  export type OrderUpsertWithoutItemsInput = {
    update: XOR<OrderUpdateWithoutItemsInput, OrderUncheckedUpdateWithoutItemsInput>
    create: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutItemsInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutItemsInput, OrderUncheckedUpdateWithoutItemsInput>
  }

  export type OrderUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    statut?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    total?: FloatFieldUpdateOperationsInput | number
    adresse?: StringFieldUpdateOperationsInput | string
    modePaiement?: StringFieldUpdateOperationsInput | string
    methodeExpedition?: StringFieldUpdateOperationsInput | string
    fraisLivraison?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scan1Done?: BoolFieldUpdateOperationsInput | boolean
    scan1Result?: NullableStringFieldUpdateOperationsInput | string | null
    scan1ShippingAllowed?: BoolFieldUpdateOperationsInput | boolean
    scan2Done?: BoolFieldUpdateOperationsInput | boolean
    scan2Result?: NullableStringFieldUpdateOperationsInput | string | null
    retourDemande?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutOrdersNestedInput
  }

  export type OrderUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    statut?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    total?: FloatFieldUpdateOperationsInput | number
    adresse?: StringFieldUpdateOperationsInput | string
    modePaiement?: StringFieldUpdateOperationsInput | string
    methodeExpedition?: StringFieldUpdateOperationsInput | string
    fraisLivraison?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    scan1Done?: BoolFieldUpdateOperationsInput | boolean
    scan1Result?: NullableStringFieldUpdateOperationsInput | string | null
    scan1ShippingAllowed?: BoolFieldUpdateOperationsInput | boolean
    scan2Done?: BoolFieldUpdateOperationsInput | boolean
    scan2Result?: NullableStringFieldUpdateOperationsInput | string | null
    retourDemande?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProductUpsertWithoutOrderItemsInput = {
    update: XOR<ProductUpdateWithoutOrderItemsInput, ProductUncheckedUpdateWithoutOrderItemsInput>
    create: XOR<ProductCreateWithoutOrderItemsInput, ProductUncheckedCreateWithoutOrderItemsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutOrderItemsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutOrderItemsInput, ProductUncheckedUpdateWithoutOrderItemsInput>
  }

  export type ProductUpdateWithoutOrderItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    prix?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    images?: ProductUpdateimagesInput | string[]
    prixVariables?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actif?: BoolFieldUpdateOperationsInput | boolean
    cartItems?: CartItemUpdateManyWithoutProductNestedInput
    favorites?: FavoriteUpdateManyWithoutProductNestedInput
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
    vendeur?: VendeurProfileUpdateOneWithoutProductsNestedInput
    variants?: ProductVariantUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutOrderItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    prix?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    images?: ProductUpdateimagesInput | string[]
    prixVariables?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: StringFieldUpdateOperationsInput | string
    actif?: BoolFieldUpdateOperationsInput | boolean
    vendeurId?: NullableStringFieldUpdateOperationsInput | string | null
    cartItems?: CartItemUncheckedUpdateManyWithoutProductNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutProductNestedInput
    variants?: ProductVariantUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductVariantUpsertWithoutOrderItemsInput = {
    update: XOR<ProductVariantUpdateWithoutOrderItemsInput, ProductVariantUncheckedUpdateWithoutOrderItemsInput>
    create: XOR<ProductVariantCreateWithoutOrderItemsInput, ProductVariantUncheckedCreateWithoutOrderItemsInput>
    where?: ProductVariantWhereInput
  }

  export type ProductVariantUpdateToOneWithWhereWithoutOrderItemsInput = {
    where?: ProductVariantWhereInput
    data: XOR<ProductVariantUpdateWithoutOrderItemsInput, ProductVariantUncheckedUpdateWithoutOrderItemsInput>
  }

  export type ProductVariantUpdateWithoutOrderItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    couleur?: NullableStringFieldUpdateOperationsInput | string | null
    stock?: IntFieldUpdateOperationsInput | number
    images?: ProductVariantUpdateimagesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutVariantsNestedInput
    cartItems?: CartItemUpdateManyWithoutVariantNestedInput
  }

  export type ProductVariantUncheckedUpdateWithoutOrderItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    couleur?: NullableStringFieldUpdateOperationsInput | string | null
    stock?: IntFieldUpdateOperationsInput | number
    images?: ProductVariantUpdateimagesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cartItems?: CartItemUncheckedUpdateManyWithoutVariantNestedInput
  }

  export type UserCreateWithoutResetTokensInput = {
    id?: string
    nom: string
    prenom: string
    email?: string | null
    telephone?: string | null
    motDePasse?: string | null
    role?: $Enums.Role
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    age?: number | null
    genre?: $Enums.Genre | null
    wilaya?: string | null
    cart?: CartCreateNestedOneWithoutUserInput
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    orders?: OrderCreateNestedManyWithoutUserInput
    vendeurProfile?: VendeurProfileCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutResetTokensInput = {
    id?: string
    nom: string
    prenom: string
    email?: string | null
    telephone?: string | null
    motDePasse?: string | null
    role?: $Enums.Role
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    age?: number | null
    genre?: $Enums.Genre | null
    wilaya?: string | null
    cart?: CartUncheckedCreateNestedOneWithoutUserInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput
    vendeurProfile?: VendeurProfileUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutResetTokensInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutResetTokensInput, UserUncheckedCreateWithoutResetTokensInput>
  }

  export type UserUpsertWithoutResetTokensInput = {
    update: XOR<UserUpdateWithoutResetTokensInput, UserUncheckedUpdateWithoutResetTokensInput>
    create: XOR<UserCreateWithoutResetTokensInput, UserUncheckedCreateWithoutResetTokensInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutResetTokensInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutResetTokensInput, UserUncheckedUpdateWithoutResetTokensInput>
  }

  export type UserUpdateWithoutResetTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    motDePasse?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    genre?: NullableEnumGenreFieldUpdateOperationsInput | $Enums.Genre | null
    wilaya?: NullableStringFieldUpdateOperationsInput | string | null
    cart?: CartUpdateOneWithoutUserNestedInput
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    orders?: OrderUpdateManyWithoutUserNestedInput
    vendeurProfile?: VendeurProfileUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutResetTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    motDePasse?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    age?: NullableIntFieldUpdateOperationsInput | number | null
    genre?: NullableEnumGenreFieldUpdateOperationsInput | $Enums.Genre | null
    wilaya?: NullableStringFieldUpdateOperationsInput | string | null
    cart?: CartUncheckedUpdateOneWithoutUserNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput
    vendeurProfile?: VendeurProfileUncheckedUpdateOneWithoutUserNestedInput
  }

  export type FavoriteCreateManyUserInput = {
    id?: string
    createdAt?: Date | string
    productId: string
  }

  export type OrderCreateManyUserInput = {
    id?: string
    statut?: $Enums.OrderStatus
    total: number
    adresse: string
    modePaiement?: string
    methodeExpedition?: string
    fraisLivraison?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    scan1Done?: boolean
    scan1Result?: string | null
    scan1ShippingAllowed?: boolean
    scan2Done?: boolean
    scan2Result?: string | null
    retourDemande?: boolean
  }

  export type ResetTokenCreateManyUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    used?: boolean
    createdAt?: Date | string
    verified?: boolean
    code: string
  }

  export type FavoriteUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutFavoritesNestedInput
  }

  export type FavoriteUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productId?: StringFieldUpdateOperationsInput | string
  }

  export type FavoriteUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productId?: StringFieldUpdateOperationsInput | string
  }

  export type OrderUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    statut?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    total?: FloatFieldUpdateOperationsInput | number
    adresse?: StringFieldUpdateOperationsInput | string
    modePaiement?: StringFieldUpdateOperationsInput | string
    methodeExpedition?: StringFieldUpdateOperationsInput | string
    fraisLivraison?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scan1Done?: BoolFieldUpdateOperationsInput | boolean
    scan1Result?: NullableStringFieldUpdateOperationsInput | string | null
    scan1ShippingAllowed?: BoolFieldUpdateOperationsInput | boolean
    scan2Done?: BoolFieldUpdateOperationsInput | boolean
    scan2Result?: NullableStringFieldUpdateOperationsInput | string | null
    retourDemande?: BoolFieldUpdateOperationsInput | boolean
    items?: OrderItemUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    statut?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    total?: FloatFieldUpdateOperationsInput | number
    adresse?: StringFieldUpdateOperationsInput | string
    modePaiement?: StringFieldUpdateOperationsInput | string
    methodeExpedition?: StringFieldUpdateOperationsInput | string
    fraisLivraison?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scan1Done?: BoolFieldUpdateOperationsInput | boolean
    scan1Result?: NullableStringFieldUpdateOperationsInput | string | null
    scan1ShippingAllowed?: BoolFieldUpdateOperationsInput | boolean
    scan2Done?: BoolFieldUpdateOperationsInput | boolean
    scan2Result?: NullableStringFieldUpdateOperationsInput | string | null
    retourDemande?: BoolFieldUpdateOperationsInput | boolean
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    statut?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    total?: FloatFieldUpdateOperationsInput | number
    adresse?: StringFieldUpdateOperationsInput | string
    modePaiement?: StringFieldUpdateOperationsInput | string
    methodeExpedition?: StringFieldUpdateOperationsInput | string
    fraisLivraison?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scan1Done?: BoolFieldUpdateOperationsInput | boolean
    scan1Result?: NullableStringFieldUpdateOperationsInput | string | null
    scan1ShippingAllowed?: BoolFieldUpdateOperationsInput | boolean
    scan2Done?: BoolFieldUpdateOperationsInput | boolean
    scan2Result?: NullableStringFieldUpdateOperationsInput | string | null
    retourDemande?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ResetTokenUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    code?: StringFieldUpdateOperationsInput | string
  }

  export type ResetTokenUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    code?: StringFieldUpdateOperationsInput | string
  }

  export type ResetTokenUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    code?: StringFieldUpdateOperationsInput | string
  }

  export type VendeurDocumentCreateManyVendeurInput = {
    id?: string
    type: string
    label: string
    description?: string | null
    fichier?: string | null
    statut?: $Enums.DocumentStatut
    adminNote?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductCreateManyVendeurInput = {
    id?: string
    nom: string
    description?: string | null
    prix: number
    stock?: number
    images?: ProductCreateimagesInput | string[]
    prixVariables?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    categoryId: string
    actif?: boolean
  }

  export type CategoryCreateManyVendeurInput = {
    id?: string
    nom: string
    description?: string | null
    image?: string | null
    statut?: $Enums.CategoryStatut
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VendeurDocumentUpdateWithoutVendeurInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    fichier?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumDocumentStatutFieldUpdateOperationsInput | $Enums.DocumentStatut
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VendeurDocumentUncheckedUpdateWithoutVendeurInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    fichier?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumDocumentStatutFieldUpdateOperationsInput | $Enums.DocumentStatut
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VendeurDocumentUncheckedUpdateManyWithoutVendeurInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    fichier?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumDocumentStatutFieldUpdateOperationsInput | $Enums.DocumentStatut
    adminNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUpdateWithoutVendeurInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    prix?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    images?: ProductUpdateimagesInput | string[]
    prixVariables?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actif?: BoolFieldUpdateOperationsInput | boolean
    cartItems?: CartItemUpdateManyWithoutProductNestedInput
    favorites?: FavoriteUpdateManyWithoutProductNestedInput
    orderItems?: OrderItemUpdateManyWithoutProductNestedInput
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
    variants?: ProductVariantUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutVendeurInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    prix?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    images?: ProductUpdateimagesInput | string[]
    prixVariables?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: StringFieldUpdateOperationsInput | string
    actif?: BoolFieldUpdateOperationsInput | boolean
    cartItems?: CartItemUncheckedUpdateManyWithoutProductNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutProductNestedInput
    orderItems?: OrderItemUncheckedUpdateManyWithoutProductNestedInput
    variants?: ProductVariantUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateManyWithoutVendeurInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    prix?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    images?: ProductUpdateimagesInput | string[]
    prixVariables?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: StringFieldUpdateOperationsInput | string
    actif?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CategoryUpdateWithoutVendeurInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumCategoryStatutFieldUpdateOperationsInput | $Enums.CategoryStatut
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutVendeurInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumCategoryStatutFieldUpdateOperationsInput | $Enums.CategoryStatut
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateManyWithoutVendeurInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumCategoryStatutFieldUpdateOperationsInput | $Enums.CategoryStatut
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCreateManyCategoryInput = {
    id?: string
    nom: string
    description?: string | null
    prix: number
    stock?: number
    images?: ProductCreateimagesInput | string[]
    prixVariables?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    actif?: boolean
    vendeurId?: string | null
  }

  export type ProductUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    prix?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    images?: ProductUpdateimagesInput | string[]
    prixVariables?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actif?: BoolFieldUpdateOperationsInput | boolean
    cartItems?: CartItemUpdateManyWithoutProductNestedInput
    favorites?: FavoriteUpdateManyWithoutProductNestedInput
    orderItems?: OrderItemUpdateManyWithoutProductNestedInput
    vendeur?: VendeurProfileUpdateOneWithoutProductsNestedInput
    variants?: ProductVariantUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    prix?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    images?: ProductUpdateimagesInput | string[]
    prixVariables?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actif?: BoolFieldUpdateOperationsInput | boolean
    vendeurId?: NullableStringFieldUpdateOperationsInput | string | null
    cartItems?: CartItemUncheckedUpdateManyWithoutProductNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutProductNestedInput
    orderItems?: OrderItemUncheckedUpdateManyWithoutProductNestedInput
    variants?: ProductVariantUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateManyWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    prix?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    images?: ProductUpdateimagesInput | string[]
    prixVariables?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actif?: BoolFieldUpdateOperationsInput | boolean
    vendeurId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CartItemCreateManyProductInput = {
    id?: string
    quantite?: number
    cartId: string
    variantId?: string | null
  }

  export type FavoriteCreateManyProductInput = {
    id?: string
    createdAt?: Date | string
    userId: string
  }

  export type OrderItemCreateManyProductInput = {
    id?: string
    quantite: number
    prix: number
    orderId: string
    variantId?: string | null
    variantNom?: string | null
  }

  export type ProductVariantCreateManyProductInput = {
    id?: string
    nom: string
    couleur?: string | null
    stock?: number
    images?: ProductVariantCreateimagesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CartItemUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantite?: IntFieldUpdateOperationsInput | number
    cart?: CartUpdateOneRequiredWithoutItemsNestedInput
    variant?: ProductVariantUpdateOneWithoutCartItemsNestedInput
  }

  export type CartItemUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantite?: IntFieldUpdateOperationsInput | number
    cartId?: StringFieldUpdateOperationsInput | string
    variantId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CartItemUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantite?: IntFieldUpdateOperationsInput | number
    cartId?: StringFieldUpdateOperationsInput | string
    variantId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FavoriteUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFavoritesNestedInput
  }

  export type FavoriteUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type FavoriteUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type OrderItemUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantite?: IntFieldUpdateOperationsInput | number
    prix?: FloatFieldUpdateOperationsInput | number
    variantNom?: NullableStringFieldUpdateOperationsInput | string | null
    order?: OrderUpdateOneRequiredWithoutItemsNestedInput
    variant?: ProductVariantUpdateOneWithoutOrderItemsNestedInput
  }

  export type OrderItemUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantite?: IntFieldUpdateOperationsInput | number
    prix?: FloatFieldUpdateOperationsInput | number
    orderId?: StringFieldUpdateOperationsInput | string
    variantId?: NullableStringFieldUpdateOperationsInput | string | null
    variantNom?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OrderItemUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantite?: IntFieldUpdateOperationsInput | number
    prix?: FloatFieldUpdateOperationsInput | number
    orderId?: StringFieldUpdateOperationsInput | string
    variantId?: NullableStringFieldUpdateOperationsInput | string | null
    variantNom?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProductVariantUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    couleur?: NullableStringFieldUpdateOperationsInput | string | null
    stock?: IntFieldUpdateOperationsInput | number
    images?: ProductVariantUpdateimagesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cartItems?: CartItemUpdateManyWithoutVariantNestedInput
    orderItems?: OrderItemUpdateManyWithoutVariantNestedInput
  }

  export type ProductVariantUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    couleur?: NullableStringFieldUpdateOperationsInput | string | null
    stock?: IntFieldUpdateOperationsInput | number
    images?: ProductVariantUpdateimagesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cartItems?: CartItemUncheckedUpdateManyWithoutVariantNestedInput
    orderItems?: OrderItemUncheckedUpdateManyWithoutVariantNestedInput
  }

  export type ProductVariantUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    couleur?: NullableStringFieldUpdateOperationsInput | string | null
    stock?: IntFieldUpdateOperationsInput | number
    images?: ProductVariantUpdateimagesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CartItemCreateManyVariantInput = {
    id?: string
    quantite?: number
    cartId: string
    productId: string
  }

  export type OrderItemCreateManyVariantInput = {
    id?: string
    quantite: number
    prix: number
    orderId: string
    productId: string
    variantNom?: string | null
  }

  export type CartItemUpdateWithoutVariantInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantite?: IntFieldUpdateOperationsInput | number
    cart?: CartUpdateOneRequiredWithoutItemsNestedInput
    product?: ProductUpdateOneRequiredWithoutCartItemsNestedInput
  }

  export type CartItemUncheckedUpdateWithoutVariantInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantite?: IntFieldUpdateOperationsInput | number
    cartId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
  }

  export type CartItemUncheckedUpdateManyWithoutVariantInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantite?: IntFieldUpdateOperationsInput | number
    cartId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
  }

  export type OrderItemUpdateWithoutVariantInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantite?: IntFieldUpdateOperationsInput | number
    prix?: FloatFieldUpdateOperationsInput | number
    variantNom?: NullableStringFieldUpdateOperationsInput | string | null
    order?: OrderUpdateOneRequiredWithoutItemsNestedInput
    product?: ProductUpdateOneRequiredWithoutOrderItemsNestedInput
  }

  export type OrderItemUncheckedUpdateWithoutVariantInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantite?: IntFieldUpdateOperationsInput | number
    prix?: FloatFieldUpdateOperationsInput | number
    orderId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    variantNom?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OrderItemUncheckedUpdateManyWithoutVariantInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantite?: IntFieldUpdateOperationsInput | number
    prix?: FloatFieldUpdateOperationsInput | number
    orderId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    variantNom?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CartItemCreateManyCartInput = {
    id?: string
    quantite?: number
    productId: string
    variantId?: string | null
  }

  export type CartItemUpdateWithoutCartInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantite?: IntFieldUpdateOperationsInput | number
    product?: ProductUpdateOneRequiredWithoutCartItemsNestedInput
    variant?: ProductVariantUpdateOneWithoutCartItemsNestedInput
  }

  export type CartItemUncheckedUpdateWithoutCartInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantite?: IntFieldUpdateOperationsInput | number
    productId?: StringFieldUpdateOperationsInput | string
    variantId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CartItemUncheckedUpdateManyWithoutCartInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantite?: IntFieldUpdateOperationsInput | number
    productId?: StringFieldUpdateOperationsInput | string
    variantId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OrderItemCreateManyOrderInput = {
    id?: string
    quantite: number
    prix: number
    productId: string
    variantId?: string | null
    variantNom?: string | null
  }

  export type OrderItemUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantite?: IntFieldUpdateOperationsInput | number
    prix?: FloatFieldUpdateOperationsInput | number
    variantNom?: NullableStringFieldUpdateOperationsInput | string | null
    product?: ProductUpdateOneRequiredWithoutOrderItemsNestedInput
    variant?: ProductVariantUpdateOneWithoutOrderItemsNestedInput
  }

  export type OrderItemUncheckedUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantite?: IntFieldUpdateOperationsInput | number
    prix?: FloatFieldUpdateOperationsInput | number
    productId?: StringFieldUpdateOperationsInput | string
    variantId?: NullableStringFieldUpdateOperationsInput | string | null
    variantNom?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OrderItemUncheckedUpdateManyWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantite?: IntFieldUpdateOperationsInput | number
    prix?: FloatFieldUpdateOperationsInput | number
    productId?: StringFieldUpdateOperationsInput | string
    variantId?: NullableStringFieldUpdateOperationsInput | string | null
    variantNom?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}