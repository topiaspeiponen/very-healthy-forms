using Microsoft.EntityFrameworkCore;
namespace backend;

public class FormsDbContext : DbContext
{
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Initialize the DB context with a form entity
        // that is the Core-10 form type
        var core10form = new Form
        {
            Id = 1,
            Name = "Core-10"
        };
        modelBuilder.Entity<Form>().HasData(core10form);
        modelBuilder.Entity<FormField>().HasData(
           new FormField { Id = 1, FormId = 1, FieldName = "1", FieldType = "Number" },
           new FormField { Id = 2, FormId = 1, FieldName = "2", FieldType = "Number" },
           new FormField { Id = 3, FormId = 1, FieldName = "3", FieldType = "Number" },
           new FormField { Id = 4, FormId = 1, FieldName = "4", FieldType = "Number" },
           new FormField { Id = 5, FormId = 1, FieldName = "5", FieldType = "Number" },
           new FormField { Id = 6, FormId = 1, FieldName = "6", FieldType = "Number" },
           new FormField { Id = 7, FormId = 1, FieldName = "7", FieldType = "Number" },
           new FormField { Id = 8, FormId = 1, FieldName = "8", FieldType = "Number" },
           new FormField { Id = 9, FormId = 1, FieldName = "9", FieldType = "Number" },
           new FormField { Id = 10, FormId = 1, FieldName = "10", FieldType = "Number" }
       );
    }
    public FormsDbContext(DbContextOptions<FormsDbContext> options)
        : base(options) { }

    public DbSet<Form> Forms => Set<Form>();
    public DbSet<FormField> FormFields => Set<FormField>();
    public DbSet<FormSubmission> FormSubmissions => Set<FormSubmission>();
    public DbSet<FormSubmissionField> FormSubmissionFields => Set<FormSubmissionField>();
}