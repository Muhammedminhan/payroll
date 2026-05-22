# Replaces the previously generated CheckConstraint (which did NOT prevent
# multiple inserts) with a proper singleton enforcement:
#   1. A new `singleton_lock` BooleanField always set to True by the model.
#   2. A UniqueConstraint on `singleton_lock` so the DB guarantees only one row.

from django.db import migrations, models


def collapse_existing_form_tokens(apps, schema_editor):
    ZohoPeopleFormToken = apps.get_model('zohopeople', 'ZohoPeopleFormToken')
    keeper = (
        ZohoPeopleFormToken.objects
        .order_by('-created', '-id')
        .first()
    )
    if keeper is None:
        return

    ZohoPeopleFormToken.objects.exclude(pk=keeper.pk).delete()
    ZohoPeopleFormToken.objects.filter(pk=keeper.pk).update(
        id=1,
        singleton_lock=True,
    )


class Migration(migrations.Migration):

    dependencies = [
        ('zohopeople', '0001_initial'),
    ]

    operations = [
        # Step 1: Add the singleton_lock column (default True, non-editable).
        migrations.AddField(
            model_name='zohopeopleformtoken',
            name='singleton_lock',
            field=models.BooleanField(default=True, editable=False),
        ),
        # Step 2: Collapse any existing duplicates before adding uniqueness.
        migrations.RunPython(
            collapse_existing_form_tokens,
            reverse_code=migrations.RunPython.noop,
        ),
        # Step 3: Enforce uniqueness at the DB level — only one True value allowed.
        migrations.AddConstraint(
            model_name='zohopeopleformtoken',
            constraint=models.UniqueConstraint(
                fields=['singleton_lock'],
                name='zoho_people_form_token_singleton',
            ),
        ),
    ]
