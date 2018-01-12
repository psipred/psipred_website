from django.db import models


class TimeStampedModel(models.Model):
    """
    An abstract base class model that provides self-updating ``created``
    and ``modified`` fields.

    use with
    class Flavor(TimeStampedModel):
    """
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


# Create your models here.
class Request(TimeStampedModel):
    email = models.EmailField(max_length=256, null=True, blank=False)
    password = models.CharField(max_length=25, null=True, blank=True)
    job_name = models.CharField(max_length=128, null=False, blank=False)
    input_data = models.TextField(null=False, blank=False)
    psipred_job = models.BooleanField(null=False, default=False)
    disopred_job = models.BooleanField(null=False, default=False)
    memsatsvm_job = models.BooleanField(null=False, default=False)
    pgenthreader_job = models.BooleanField(null=False, default=False)
