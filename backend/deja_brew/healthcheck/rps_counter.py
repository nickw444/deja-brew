import datetime


class RpsCounter:
    def __init__(self):
        self._req_counts = [0 for _ in range(60)]
        self._curr_ptr = None

    def track_request(self):
        now = datetime.datetime.now()
        old_ptr = self._curr_ptr
        self._curr_ptr = now.minute
        if old_ptr is not None and self._curr_ptr != old_ptr:
            for x in range(old_ptr + 1, self._curr_ptr + 1):
                self._req_counts[x] = self._req_counts[x - 1]

        self._req_counts[self._curr_ptr] += 1

    def get_stats(self):
        return (
            (self._req_counts[self._curr_ptr] - self._req_counts[self._curr_ptr - 1])
            / 60,
            (self._req_counts[self._curr_ptr] - self._req_counts[self._curr_ptr - 5])
            / (60 * 5),
            (self._req_counts[self._curr_ptr] - self._req_counts[self._curr_ptr - 15])
            / (60 * 60),
        )
