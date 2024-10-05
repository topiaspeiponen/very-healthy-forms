using backend;
using Microsoft.EntityFrameworkCore;

public class CreateFormSubmissionInput
{
    public Guid FormId { get; set; }
    public required string SubmitterName { get; set; }
    public required List<CreateFormSubmissionFieldInput> SubmissionFields { get; set; }
}

public class CreateFormSubmissionFieldInput
{
    public required string Name { get; set; }
    public required string Value { get; set; }
    public Guid FormFieldId { get; set; }
}

public class Mutation
{
    public async Task<FormSubmission> CreateForm(
        [Service] FormsDbContext dbContext,
        CreateFormSubmissionInput input)
    {
        // Fetch the field types
        var formFields = await dbContext.FormFields.ToListAsync();

        // Calculate total score from fields
        int totalScore = 0;
        foreach (var field in input.SubmissionFields)
        {
            var formField = formFields.Find(f => f.Id == field.FormFieldId);
            if (formField == null) continue;

            if (formField.FieldType == FormFieldType.RadioNumber || formField.FieldType == FormFieldType.RadioNumberReverse )
            {
                if (int.TryParse(field.Value, out int score)) totalScore += score;
            }
        }

        // Create a new form entity
        var newSubmissionFormId = Guid.NewGuid();
        var submission = new FormSubmission
        {
            FormId = input.FormId,
            SubmitterName = input.SubmitterName,
            Score = totalScore,
            SubmissionFields = input.SubmissionFields.Select(f => new FormSubmissionField
            {
                FormSubmissionId = newSubmissionFormId,
                FormFieldId = f.FormFieldId,
                Value = f.Value,
                Name = f.Name
            }).ToList()
        };

        dbContext.FormSubmissions.Add(submission);
        await dbContext.SaveChangesAsync();

        return submission;
    }
}