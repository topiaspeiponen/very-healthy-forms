using backend;

public class CreateFormSubmissionInput
{
    public Guid FormId { get; set; }
    public required string SubmitterName { get; set;}
    public required List<CreateFormSubmissionFieldInput> Fields { get; set; }
}

public class CreateFormSubmissionFieldInput
{
    public required string  Name { get; set; }
    public required string Value { get; set; }
    public Guid FormFieldId { get; set; }
}

public class Mutation
{
    public async Task<FormSubmission> CreateForm(
        [Service] FormsDbContext dbContext, 
        CreateFormSubmissionInput input)
    {
        // Create a new form entity
        var newSubmissionFormId = Guid.NewGuid();
        var submission = new FormSubmission
        {
            FormId = input.FormId,
            SubmitterName = input.SubmitterName,
            SubmissionFields = input.Fields.Select(f => new FormSubmissionField
            {
                FormSubmissionId = newSubmissionFormId,
                FormFieldId = f.FormFieldId,
                Value = f.Value
            }).ToList()
        };

        // Add the form to the DbContext
        dbContext.FormSubmissions.Add(submission);
        await dbContext.SaveChangesAsync();

        // Return the created form
        return submission;
    }
}