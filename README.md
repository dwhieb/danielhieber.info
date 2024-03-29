# danielhieber.info

The academic website of Daniel W. Hieber, Ph.D., diversity linguist.

## License

The code in this repository is subject to an [ISC license][ISC]. The content of the danielhieber.info website is copyright to [Daniel W. Hieber][me].

## Developer Notes

### Deployment

Merge a commit into `main`.

### LESS

Include LESS files as follows:

#### Liquid

```liquid
{% capture css %}
  {% include './Home.less' %}
{% endcapture %}

<style>
  {{ css | less | safe }}
</style>
```

#### Nunjucks

```
{% set css %}
  {% include './Home.less' %}
{% endset %}

<style>
  {{ css | less }}
</style>
```

<!-- LINKS -->
[ISC]: https://choosealicense.com/licenses/isc/
[me]:  https://danielhieber.info/
