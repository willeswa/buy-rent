from rest_framework import viewsets, views
from rest_framework.response import Response
from rest_framework import status

from .models import PropertyType, Stall, Rental, Land, OfficeSpace, Hostel
from .serializers import PropertyTypeSerializer, LandSerializer,\
    RentalSerializer, HostelSerializer, OfficeSpaceSerializer, StallSerializer
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


class AllProperties(views.APIView):
    """Constract a list of all properties
    """

    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request, formart=None):
        """Returns a list of all the properties in the system
        """

        lands = [{'id': 1+land.id, 'owner':land.owner, 'property_type': 'Lands', 'title': land.title, 'price': land.price, 'image': land.image, 'division': land.division,
                  'ward': land.ward, 'locality': land.locality} for land in Land.objects.all()]
        stalls = [{'id': 2+stall.id, 'owner':stall.owner, 'property_type': 'Stalls', 'title': stall.title, 'price': stall.price, 'image': stall.image, 'division': stall.division,
                   'ward': stall.ward, 'locality': stall.locality} for stall in Stall.objects.all()]
        offices = [{'id': 3+office.id,'owner':office.owner, 'property_type': 'Offices', 'title': office.title, 'price': office.price, 'image': office.image, 'division': office.division,
                    'ward': office.ward, 'locality': office.locality} for office in OfficeSpace.objects.all()]
        rentals = [{'id': 4+rental.id, 'owner':rental.owner, 'property_type': 'Rentals', 'title': rental.title, 'price': rental.price, 'image': rental.image, 'division': rental.division,
                    'ward': rental.ward, 'locality': rental.locality} for rental in Rental.objects.all()]
        hostels = [{'id': 5+hostel.id, 'owner':hostel.owner, 'property_type': 'Hostels', 'title': hostel.title, 'price': hostel.price, 'image': hostel.image, 'division': hostel.division,
                    'ward': hostel.ward, 'locality': hostel.locality} for hostel in Hostel.objects.all()]

        all_properties = lands + stalls + offices + rentals + hostels

        return Response(data=all_properties, status=status.HTTP_200_OK)
