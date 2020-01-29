from rest_framework import viewsets, views
from rest_framework.response import Response
from rest_framework import status

from .models import PropertyType, Stall, Rental, Land, OfficeSpace, Hostel, Property
from .serializers import PropertyTypeSerializer, LandSerializer,\
    RentalSerializer, HostelSerializer, OfficeSpaceSerializer, StallSerializer, AllPropertySerializer
from ..authentication.serializers import UserSerializer
from ..utils.validatators import validate_phone_number, validate_text_input
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.decorators import action


class PropertyTypeViewset(viewsets.ModelViewSet):
    """CRUD functionality for property types
    """
    queryset = PropertyType.objects.all()
    serializer_class = PropertyTypeSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)


class LandViewset(viewsets.ModelViewSet):
    """View for Land
    """

    queryset = Land.objects.all()
    serializer_class = LandSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)


class StallViewset(viewsets.ModelViewSet):
    """View for Stall
    """
    print('is it here')

    queryset = Stall.objects.all()
    serializer_class = StallSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)


class OfficeSpaceViewset(viewsets.ModelViewSet):
    """View for OfficeSpace
    """

    queryset = OfficeSpace.objects.all()
    serializer_class = OfficeSpaceSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)


class HostelViewset(viewsets.ModelViewSet):
    """View for Hostel
    """

    queryset = Hostel.objects.all()
    serializer_class = HostelSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)


class RentalViewset(viewsets.ModelViewSet):
    """View for Rental
    """

    queryset = Rental.objects.all()
    serializer_class = RentalSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)


class AllProperties(viewsets.ModelViewSet):
    """Constract a list of all properties
    """
    queryset = Property.objects.all()
    serializer_class = AllPropertySerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

