"""this codebase is purposefully shit i swear"""
import datetime
import os
import matplotlib.animation as animation
import matplotlib.pyplot as plt


FRAME_DIR = "./keyframes"


FORMAT_DICT = {
    "I": int,
    "U": lambda a: datetime.datetime.fromtimestamp(int(a) // 1000000),
    "F": float,
}


def gen_points(f: str):
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

    return [
        [FORMAT_DICT[head["type"][i]](v) for i, v in enumerate(point_line.split(" "))]
        for point_line in f_data_str[1:-1]
    ]


fg = plt.figure()
ax = fg.add_subplot(projection="3d")
ax.azim = 0
ax.elev = 30


def animate(filename):
    points = gen_points(filename)
    transposed = list(zip(*points))
    ax.scatter3D(
        transposed[0],
        transposed[1],
        list(map(lambda a: a * -1, transposed[2])),
        c=transposed[3],
        s=0.01,
    )
    return


ani = animation.FuncAnimation(
    fg, animate, interval=500, frames=sorted(os.listdir(FRAME_DIR))
)


plt.show()
