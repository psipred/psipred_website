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
    email = models.EmailField(max_length=256, null=True, blank=True)
    password = models.CharField(max_length=25, null=True, blank=True)
    job_name = models.CharField(max_length=128, null=False, blank=False)
    input_data = models.TextField(null=False, blank=False)
    # sequence jobs
    psipred_job = models.BooleanField(null=False, default=False)
    disopred_job = models.BooleanField(null=False, default=False)
    memsatsvm_job = models.BooleanField(null=False, default=False)
    pgenthreader_job = models.BooleanField(null=False, default=False)
    mempack_job = models.BooleanField(null=False, default=False)
    genthreader_job = models.BooleanField(null=False, default=False)
    pdomthreader_job = models.BooleanField(null=False, default=False)
    bioserf_job = models.BooleanField(null=False, default=False)
    domserf_job = models.BooleanField(null=False, default=False)
    ffpred_job = models.BooleanField(null=False, default=False)
    metapsicov_job = models.BooleanField(null=False, default=False)

    # structure jobs
    metsite_job = models.BooleanField(null=False, default=False)
    hspred_job = models.BooleanField(null=False, default=False)
    memembed_job = models.BooleanField(null=False, default=False)
    gentdb_job = models.BooleanField(null=False, default=False)


class ServerSuspension(models.Model):
    suspend = models.BooleanField(null=False, default=False)
    message = models.CharField(max_length=512, null=True, blank=False)
    allowed_ip = models.GenericIPAddressField(default="127.0.0.1", null=False,
                                              blank=False)
