using System.ComponentModel.DataAnnotations.Schema;
namespace backend;
public class Form {
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public ICollection<FormField>? Fields { get; set; }
}
public class FormField {
    public Guid Id { get; set; }
    public Guid FormId { get; set; }
    public Form? Form { get; set; } 
    public required string FieldName { get; set; }
    public required string FieldType { get; set;}
    public required string FieldLabel { get; set;}
}
public class FormSubmission {
    public Guid Id { get; set; }
    public Guid FormId { get; set; }
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public DateTime Created { get; set; }
    public required string SubmitterName { get; set; }
    public Form? Form { get; set; }
    public ICollection<FormSubmissionField>? SubmissionFields { get; set; }
}
public class FormSubmissionField {
    public Guid Id { get; set; }
    public Guid FormSubmissionId { get; set; }
    public FormSubmission? FormSubmission { get; set; } 
    public Guid FormFieldId { get; set; }
    public FormField? FormField { get; set; } 
    public required string Value;
}