from graphql import GraphQLError


from functools import wraps


def login_required(func):
    @wraps(func)
    def wrapper(root, info, *args, **kwargs):
        user = getattr(info.context, "user", None)  # Access user safely from request context
        if not getattr(user, "is_authenticated", False):
            raise GraphQLError("Authentication required.")
        return func(root, info, *args, **kwargs)

    return wrapper
