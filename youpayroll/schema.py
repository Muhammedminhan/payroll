import graphene
from payees.schema import PayeesQuery, PayeeMutation
from payroll.schema import PayrollQuery


class Query(PayeesQuery, PayrollQuery, graphene.ObjectType):
    pass


class Mutation(PayeeMutation, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
