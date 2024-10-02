namespace backend;

public class FormQueryType : ObjectType<Form>
{
    protected override void Configure(IObjectTypeDescriptor<Form> descriptor)
    {
        descriptor.Field(f => f.Id).Type<NonNullType<IdType>>();
        descriptor.Field(f => f.Name).Type<StringType>();
        descriptor.Field(f => f.Fields).Type<ListType<FormFieldQueryType>>();
    }
}
public class FormFieldQueryType : ObjectType<FormField>
{
    protected override void Configure(IObjectTypeDescriptor<FormField> descriptor)
    {
        descriptor.Field(f => f.Id).Type<NonNullType<IdType>>();
        descriptor.Field(f => f.FieldName).Type<StringType>();
        descriptor.Field(f => f.FieldType).Type<StringType>();
        descriptor.Field(f => f.FormId).Type<NonNullType<IntType>>();
        descriptor.Field(f => f.Form).Ignore();
    }
}
public class FormSubmissionQueryType : ObjectType<FormSubmission>
{
    protected override void Configure(IObjectTypeDescriptor<FormSubmission> descriptor)
    {
        descriptor.Field(fs => fs.Id).Type<NonNullType<IdType>>();
        descriptor.Field(fs => fs.FormId).Type<NonNullType<IntType>>();
        descriptor.Field(fs => fs.SubmissionFields).Type<ListType<FormSubmissionFieldType>>();
    }
}
public class FormSubmissionFieldType : ObjectType<FormSubmissionField>
{
    protected override void Configure(IObjectTypeDescriptor<FormSubmissionField> descriptor)
    {
        descriptor.Field(fsf => fsf.Id).Type<NonNullType<IdType>>();
        descriptor.Field(fsf => fsf.Value).Type<StringType>();
        descriptor.Field(fsf => fsf.FormSubmissionId).Type<NonNullType<IntType>>();
        descriptor.Field(fsf => fsf.FormFieldId).Type<NonNullType<IntType>>();
    }
}

public class Query { 
    public  IQueryable<Form> GetForms([Service] FormsDbContext dbContext)
        => dbContext.Forms;
}