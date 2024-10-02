namespace backend;

public class Form {
    public int Id { get; set; }
    public string? Name { get; set; }
    public ICollection<FormField>? Fields { get; set; }
}
public class FormField {
    public int Id { get; set; }
    public int FormId { get; set; }
    public Form? Form { get; set; } 
    public string? FieldName { get; set; }
    public string? FieldType { get; set;}
}
public class FormSubmission {
    public int Id { get; set; }
    public int FormId { get; set; }
     public Form? Form { get; set; }
     public ICollection<FormSubmissionField>? SubmissionFields { get; set; }
}
public class FormSubmissionField {
    public int Id { get; set; }
    public int FormSubmissionId { get; set; }
     public FormSubmission? FormSubmission { get; set; } 
    public int FormFieldId { get; set; }
    public FormField? FormField { get; set; } 
    public string? Value;
}