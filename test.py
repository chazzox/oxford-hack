"""this codebase is purposefully shit i swear"""
from ast import List
import datetime
import os
import matplotlib.pyplot as plt

fig = plt.figure()
ax = fig.add_subplot(projection="3d")


FRAME_DIR = "./keyframes"

keyframes = sorted(os.listdir(FRAME_DIR))

FORMAT_DICT = {
    "I": int,
    "U": lambda a: datetime.datetime.fromtimestamp(int(a) // 1000000),
    "F": float,
}


def gen_points(p: str, f) -> list:
    return [
        [FORMAT_DICT[f[i]](v) for i, v in enumerate(point_line.split(" ")) if v != ""]
        for point_line in p
    ]


for f in keyframes[:1]:
    with open(os.path.join(FRAME_DIR, f)) as file:
        f_data = file.read()

        f_head_str, f_data_str = [i.split("\n") for i in f_data.split("DATA ascii")]

        head = {
            k.lower(): v
            for k, v in [
                head_str.split(" ", maxsplit=1)
                for head_str in f_head_str
                if head_str != ""
            ]
        }

        head["type"] = head["type"].split(" ")

        points = gen_points(f_data_str[:-1], head["type"])


fig = plt.figure()
ax = fig.add_subplot(projection="3d")

xyz = list(zip(*[v[:3] for v in points], strict=True))


print(len(xyz), xyz)
