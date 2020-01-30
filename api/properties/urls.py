from django.urls import path, include
from django.conf.urls import url
from rest_framework.routers import SimpleRouter
from .views import PropertyTypeViewset, LandViewset, \
    StallViewset, HostelViewset, OfficeSpaceViewset, RentalViewset, AllProperties


router =  SimpleRouter()

router.register(r'types', PropertyTypeViewset)
router.register(r'lands', LandViewset)
router.register(r'hostels', HostelViewset)
router.register(r'offices', OfficeSpaceViewset)
router.register(r'rentals', RentalViewset)
router.register(r'stalls', StallViewset)


urlpatterns = [
    url(r'^all$', AllProperties.as_view())
]


urlpatterns += router.urls