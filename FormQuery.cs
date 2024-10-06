using Microsoft.EntityFrameworkCore;

namespace backend;

public class FormQueryType : ObjectType<Form>
{
    protected override void Configure(IObjectTypeDescriptor<Form> descriptor)
    {
        descriptor.Field(f => f.Id).Type<NonNullType<IdType>>();
        descriptor.Field(f => f.Name).Type<StringType>();
        descriptor.Field(f => f.Slug).Type<StringType>();
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
        descriptor.Field(f => f.FieldLabel).Type<StringType>();
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
        descriptor.Field(fs => fs.Score).Type<IntType>();
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

public class Query
{
    public async Task<List<Form>> GetForms([Service] FormsDbContext dbContext)
        => await dbContext.Forms.Include(f => f.Fields).ToListAsync();
    public async Task<Form?> GetForm([Service] FormsDbContext dbContext, Guid id)
        => await dbContext.Forms
            .Include(f => f.Fields)
            .FirstOrDefaultAsync(f => f.Id == id);
    public async Task<List<FormSubmission>> GetSubmissions([Service] FormsDbContext dbContext)
        => await dbContext.FormSubmissions
            .Include(f => f.SubmissionFields)
            .Include(f => f.Form)
            .ToListAsync();
    public async Task<FormSubmission?> GetSubmission([Service] FormsDbContext dbContext, Guid id)
    {
        // Fetch the submission and related form and submission fields
        var submission = await dbContext.FormSubmissions
            .Include(f => f.SubmissionFields)
            .Include(f => f.Form)
            .FirstOrDefaultAsync(f => f.Id == id);

        // Get form fields for form if form exists (it always should)
        if (submission != null && submission.Form != null)
        {
            await dbContext.Entry(submission.Form)
                .Collection(f => f.Fields)
                .LoadAsync();
        }
        return submission;
    }
}

