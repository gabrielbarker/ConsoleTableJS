export default class Messages {
  public static readonly ONE_ARRAY_FIELD_PER_OBJECT: string =
    "Invalid Taybl Data: Only one field per object can be an array.";
  public static readonly ARRAY_FIELD_MUST_CONTAIN_OBJECTS: string =
    "Invalid Taybl Data: Array fields must contain objects.";
  public static readonly ARRAY_FIELDS_MUST_HAVE_ONE_TYPE: string =
    "Invalid Taybl Data: Array fields must have consistent type.";
}
