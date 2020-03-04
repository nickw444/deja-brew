from setuptools import setup

setup(
    name="dto_generator",
    version='0.0.1',
    packages=['dto_generator'],
    install_requires=[
        'Click',
        'jinja2',
        'marshmallow',
        'marshmallow_enum',
    ],
)
