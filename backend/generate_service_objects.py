import click

from dto_generator import DtoGenerator


@click.command()
def generate_service_objects():
    import deja_brew.api.cafe_dto as cafe_dto_module
    import deja_brew.api.order_dto as orders_dto_module
    import deja_brew.api.user_dto as users_dto_module
    import deja_brew.frontend.bootstrap_dto as bootstrap_dto_module

    generator = DtoGenerator(
        frontend_src_root='../frontend/src',
    )

    generator.generate(cafe_dto_module)
    generator.generate(orders_dto_module)
    generator.generate(users_dto_module)
    generator.generate(bootstrap_dto_module)


if __name__ == '__main__':
    generate_service_objects()
