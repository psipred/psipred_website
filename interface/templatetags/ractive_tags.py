from django import template
from django.template.defaultfilters import stringfilter

register = template.Library()

@register.simple_tag
@stringfilter
def ractivetag(ractive_string):
    return "{{ "+ractive_string+" }}"


@register.simple_tag
@stringfilter
def ractivehtmltag(ractive_string):
    return "{{{ "+ractive_string+" }}}"
