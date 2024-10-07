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
            Name = "Core-10",
            Slug = "core-10",
        };
        modelBuilder.Entity<Form>().HasData(core10form);
        modelBuilder.Entity<FormField>().HasData(
           new FormField { Id = Guid.NewGuid(), FormId = core10FormId, FieldName = "name", FieldType = FormFieldType.Text, FieldLabel = "Nimi" },
           new FormField { Id = Guid.NewGuid(), FormId = core10FormId, FieldName = "1", FieldType = FormFieldType.RadioNumber, FieldLabel = "Olen ollut kireä, ahdistunut, tai hermostunut" },
           new FormField { Id = Guid.NewGuid(), FormId = core10FormId, FieldName = "2", FieldType = FormFieldType.RadioNumberReverse, FieldLabel = "Olen tuntenut, että minulla on joku, joka tarvittaessa tukee minua" },
           new FormField { Id = Guid.NewGuid(), FormId = core10FormId, FieldName = "3", FieldType = FormFieldType.RadioNumberReverse, FieldLabel = "Olen tuntenut selviytyväni, vaikka asiat menevät pieleen" },
           new FormField { Id = Guid.NewGuid(), FormId = core10FormId, FieldName = "4", FieldType = FormFieldType.RadioNumber, FieldLabel = "Kanssakäyminen muiden ihmisten kanssa on tuntunut ylivoimaiselta" },
           new FormField { Id = Guid.NewGuid(), FormId = core10FormId, FieldName = "5", FieldType = FormFieldType.RadioNumber, FieldLabel = "Olen ollut hätääntynyt tai kauhuissani " },
           new FormField { Id = Guid.NewGuid(), FormId = core10FormId, FieldName = "6", FieldType = FormFieldType.RadioNumber, FieldLabel = "Olen suunnitellut itsemurhaa" },
           new FormField { Id = Guid.NewGuid(), FormId = core10FormId, FieldName = "7", FieldType = FormFieldType.RadioNumber, FieldLabel = "Minun on ollut vaikea nukahtaa tai olen nukkunut katkonaisesti" },
           new FormField { Id = Guid.NewGuid(), FormId = core10FormId, FieldName = "8", FieldType = FormFieldType.RadioNumber, FieldLabel = "Olen tuntenut itseni toivottomaksi" },
           new FormField { Id = Guid.NewGuid(), FormId = core10FormId, FieldName = "9", FieldType = FormFieldType.RadioNumber, FieldLabel = "Olen ollut onneton'" },
           new FormField { Id = Guid.NewGuid(), FormId = core10FormId, FieldName = "10", FieldType = FormFieldType.RadioNumber, FieldLabel = "Epämieluisat mielikuvat tai muistot ovat ahdistaneet minua" }
       );
    }
    public FormsDbContext(DbContextOptions<FormsDbContext> options)
        : base(options) { }

    public DbSet<Form> Forms => Set<Form>();
    public DbSet<FormField> FormFields => Set<FormField>();
    public DbSet<FormSubmission> FormSubmissions => Set<FormSubmission>();
    public DbSet<FormSubmissionField> FormSubmissionFields => Set<FormSubmissionField>();
}