from rest_framework import serializers
from api.properties.models import PropertyType, Property, \
    Land, Hostel, Stall, OfficeSpace, Rental
from api.authentication.models import User
from ..authentication.serializers import UserSerializer


class PropertyTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyType
        fields = "__all__"


class LandSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    owner_id = serializers.PrimaryKeyRelatedField(write_only=True,
                                                  source='owner',
                                                  queryset=User.objects.all())

    class Meta:
        model = Land
        fields = "__all__"


class HostelSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    owner_id = serializers.PrimaryKeyRelatedField(write_only=True,
                                                  source='owner',
                                                  queryset=User.objects.all())

    class Meta:
        model = Hostel
        fields = "__all__"


class StallSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    owner_id = serializers.PrimaryKeyRelatedField(write_only=True,
                                                  source='owner',
                                                  queryset=User.objects.all())

    class Meta:
        model = Stall
        fields = "__all__"


class RentalSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    owner_id = serializers.PrimaryKeyRelatedField(write_only=True,
                                                  source='owner',
                                                  queryset=User.objects.all())

    class Meta:
        model = Rental
        fields = "__all__"


class OfficeSpaceSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    owner_id = serializers.PrimaryKeyRelatedField(write_only=True,
                                                  source='owner',
                                                  queryset=User.objects.all())

    class Meta:
        model = OfficeSpace
        fields = "__all__"


class AllPropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = "__all__"
        depth = 1
