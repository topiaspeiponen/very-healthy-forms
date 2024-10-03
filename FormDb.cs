using Microsoft.EntityFrameworkCore;
namespace backend;

public class FormsDbContext : DbContext
{
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Initialize the DB context with a form entity
        // that is the Core-10 form type
        var core10FormId = Guid.NewGuid();
        var core10form = new Form
        {
            Id = core10FormId,
            Name = "Core-10"
        };
        modelBuilder.Entity<Form>().HasData(core10form);
        modelBuilder.Entity<FormField>().HasData(
           new FormField { Id = Guid.NewGuid(), FormId = core10FormId, FieldName = "1", FieldType = "Number", FieldLabel = "1" },
           new FormField { Id = Guid.NewGuid(), FormId = core10FormId, FieldName = "2", FieldType = "Number", FieldLabel = "1" },
           new FormField { Id = Guid.NewGuid(), FormId = core10FormId, FieldName = "3", FieldType = "Number", FieldLabel = "1" },
           new FormField { Id = Guid.NewGuid(), FormId = core10FormId, FieldName = "4", FieldType = "Number", FieldLabel = "1" },
           new FormField { Id = Guid.NewGuid(), FormId = core10FormId, FieldName = "5", FieldType = "Number", FieldLabel = "1" },
           new FormField { Id = Guid.NewGuid(), FormId = core10FormId, FieldName = "6", FieldType = "Number", FieldLabel = "1" },
           new FormField { Id = Guid.NewGuid(), FormId = core10FormId, FieldName = "7", FieldType = "Number", FieldLabel = "1" },
           new FormField { Id = Guid.NewGuid(), FormId = core10FormId, FieldName = "8", FieldType = "Number", FieldLabel = "1" },
           new FormField { Id = Guid.NewGuid(), FormId = core10FormId, FieldName = "9", FieldType = "Number", FieldLabel = "1" },
           new FormField { Id = Guid.NewGuid(), FormId = core10FormId, FieldName = "10", FieldType = "Number", FieldLabel = "1" }
       );
    }
    public FormsDbContext(DbContextOptions<FormsDbContext> options)
        : base(options) { }

    public DbSet<Form> Forms => Set<Form>();
    public DbSet<FormField> FormFields => Set<FormField>();
    public DbSet<FormSubmission> FormSubmissions => Set<FormSubmission>();
    public DbSet<FormSubmissionField> FormSubmissionFields => Set<FormSubmissionField>();
}