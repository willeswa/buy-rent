from rest_framework import serializers
from api.properties.models import PropertyType, Property, \
    Land, Hostel, Stall, OfficeSpace, Rental
from ..authentication.serializers import UserSerializer


class PropertyTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyType
        fields = "__all__"


class LandSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Land
        fields = "__all__"


class HostelSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Hostel
        fields = "__all__"


class StallSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Stall
        fields = "__all__"


class RentalSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Rental
        fields = "__all__"

class OfficeSpaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = OfficeSpace
        fields = "__all__"

