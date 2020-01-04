from django.contrib import admin
from .models import PropertyType, Land, Hostel, Stall, OfficeSpace

admin.site.register(PropertyType)
admin.site.register(Land)
admin.site.register(Hostel)
admin.site.register(Stall)
admin.site.register(OfficeSpace)

