#!/usr/local/bin/python3
from aiohttp import ClientSession
import aiohttp
import asyncio
import async_timeout
import itertools
import json


async def fetch(url, session):
    print(url)
    async with session.get(url) as response:
        return await response.json()


async def run(r):

    tasks = []

    async with aiohttp.ClientSession() as session:

        task = asyncio.ensure_future(fetch('https://api.pixels.camp/project',
                                     session))
        tasks.append(task)

        responses = await asyncio.gather(*tasks)
        responses = list(itertools.chain.from_iterable([resp['projects'] for resp in responses]))

    with open('projects.json', 'w') as f:
        f.write(json.dumps(responses))


loop = asyncio.get_event_loop()
future = asyncio.ensure_future(run(4))
loop.run_until_complete(future)
