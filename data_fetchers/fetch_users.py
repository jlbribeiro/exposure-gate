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

        task = asyncio.ensure_future(fetch('https://api.pixels.camp/users/?count=2000',
                                     session))
        tasks.append(task)

        responses = await asyncio.gather(*tasks)
        responses = list(itertools.chain.from_iterable([resp['users'] for resp in responses]))

    print(len(responses))
    url = "https://api.pixels.camp/users/{}"
    tasks = []

    # Fetch all responses within one Client session,
    # keep connection alive for all requests.
    async with ClientSession() as session:
        for user in responses:
            task = asyncio.ensure_future(fetch(url.format(user['login']),
                                         session))
            tasks.append(task)

        responses = await asyncio.gather(*tasks)
        # you now have all response bodies in this variable
        with open('users.json', 'w') as f:
            f.write(json.dumps(responses))


loop = asyncio.get_event_loop()
future = asyncio.ensure_future(run(4))
loop.run_until_complete(future)
