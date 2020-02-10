import click

from deja_brew_tools.dto_generator import DtoGenerator


@click.command()
def generate_service_objects():
    import deja_brew.api.orders_dto as orders_dto_module
    import deja_brew.api.users_dto as users_dto_module

    generator = DtoGenerator()
    generator.generate(
        orders_dto_module,
        'deja_brew_frontend/src/services/order/order_service_objects.ts')
    generator.generate(
        users_dto_module,
        'deja_brew_frontend/src/services/user/user_service_objects.ts')


if __name__ == '__main__':
    generate_service_objects()
