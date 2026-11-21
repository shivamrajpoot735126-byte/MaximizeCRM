from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from apps.accounts.views import RegisterView, MeView
from apps.contacts.views import ContactViewSet
from apps.leads.views import LeadViewSet
from apps.sales.views import PipelineViewSet, OpportunityViewSet
from apps.marketing.views import CampaignViewSet
from apps.support.views import TicketViewSet
from apps.analytics.views import SavedReportViewSet
from apps.integrations.views import IntegrationViewSet
from apps.workflows.views import WorkflowViewSet
from apps.documents.views import DocumentViewSet
from apps.activities.views import TaskViewSet, EventViewSet
router = DefaultRouter()
router.register("contacts", ContactViewSet)
router.register("leads", LeadViewSet)
router.register("pipelines", PipelineViewSet)
router.register("opportunities", OpportunityViewSet)
router.register("campaigns", CampaignViewSet)
router.register("tickets", TicketViewSet)
router.register("reports", SavedReportViewSet)
router.register("integrations", IntegrationViewSet)
router.register("workflows", WorkflowViewSet)
router.register("documents", DocumentViewSet)
router.register("tasks", TaskViewSet)
router.register("events", EventViewSet)
urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/auth/register/", RegisterView.as_view(), name="register"),
    path("api/auth/me/", MeView.as_view(), name="me"),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("api/", include(router.urls)),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
]
