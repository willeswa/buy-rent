from django.db import models
from ..authentication.models import User


class PropertyType(models.Model):
    name = models.CharField(max_length=80, unique=True)
    image = models.CharField(max_length=500)


class Property(models.Model):
    """Defines a model for a property of type land
    """

    property_type = models.ForeignKey(
        PropertyType, on_delete=models.DO_NOTHING)
    title = models.CharField(max_length=250)
    description = models.TextField(max_length=1500)
    image = models.CharField(max_length=500)
    ad_ispaidfor = models.BooleanField(default=False)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    active = models.BooleanField(default=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    price = models.FloatField()
    division = models.CharField(max_length=150, null=True)
    ward = models.CharField(max_length=150, null=True)
    locality = models.CharField(max_length=150, null=True)

    class Meta:
        abstract = True
        unique_together = ('title', 'owner', 'property_type')


class Land(Property):
    """Defines the property of type land
    """

    for_sale = models.BooleanField(default=True)
    land_size = models.FloatField()
    


class Hostel(Property):
    """Defines property of the type Hostels
    """

    gender_exclusive = models.BooleanField(default=False)
    self_contained = models.BooleanField(default=False)
    wifi = models.BooleanField(default=False)
    meals = models.BooleanField(default=False)


class Rental(Property):
    """Defines property of type Rentals
    """

    rooms = models.PositiveIntegerField()
    water = models.BooleanField(default=False)


class Stall(Property):
    """Defines property of type Stall
    """
    pass


class OfficeSpace(Property):
    """Defines property of type Office Space
    """

    square_feet = models.FloatField()
    internet = models.BooleanField(default=True)

