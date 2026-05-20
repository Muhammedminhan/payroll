from graphql import GraphQLError


from functools import wraps


def login_required(func):
    @wraps(func)
    def wrapper(root, info, *args, **kwargs):
        user = info.context.user  # Access user from request context
        if not user.is_authenticated:
            raise GraphQLError("Authentication required.")
        return func(root, info, *args, **kwargs)

    return wrapper
