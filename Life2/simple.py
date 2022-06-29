import random
import time


class Generation:
    def __init__(self, length, alive="1", dead="0"):
        self.lenght: int = length
        self.width: int = 2 * self.lenght
        self.TrueSymbol: str = alive
        self.FalseSymbol: str = dead
        self.arr: list[list[int]] = [[random.randint(0, 1) for _ in range(self.width)] for _ in range(self.lenght)]
        # these arrays aren't needed as properties of the object
        # I made them neccasery
        self.arrLeft: list[list[int]] = [[0]]
        self.arrRight: list[list[int]] = [[0]]
        self.arrUP: list[list[int]] = [[0]]
        self.arrDown: list[list[int]] = [[0]]
        self.arrUpLeft: list[list[int]] = [[0]]
        self.arrUpRight: list[list[int]] = [[0]]
        self.arrDownLeft: list[list[int]] = [[0]]
        self.arrDownRight: list[list[int]] = [[0]]
        self.arrTotal: list[list[int]] = [[1]]
        self.neighbors()
        pass

    def NextGen(self):
        self.arr = self.neighbors().calc_sum().cal_new()
        return self

    def neighbors(self):
        self.arrLeft = [lijst[1:] + [lijst[0]] for lijst in self.arr]
        self.arrRight = [[lijst[-1]] + lijst[:-1] for lijst in self.arr]
        self.arrUP = self.arr[1:] + [self.arr[0]]
        self.arrUpLeft = self.arrLeft[1:] + [self.arrLeft[0]]
        self.arrUpRight = self.arrRight[1:] + [self.arrRight[0]]
        self.arrDown = [self.arr[-1]] + self.arr[:-1]
        self.arrDownLeft = [self.arrLeft[-1]] + self.arrLeft[:-1]
        self.arrDownRight = [self.arrRight[-1]] + self.arrRight[:-1]
        return self
        pass

    def calc_sum(self):
        self.arrTotal = [[elm1 + elm2 + elm3 + elm4 + elm5 + elm6 + elm7 + elm8 for
                          elm1, elm2, elm3, elm4, elm5, elm6, elm7, elm8 in zip(l1, l2, l3, l4, l5, l6, l7, l8)] for
                         l1, l2, l3, l4, l5, l6, l7, l8 in zip(self.arrLeft, self.arrRight, self.arrUP, self.arrUpLeft,
                                                               self.arrUpRight, self.arrDown, self.arrDownLeft,
                                                               self.arrDownRight)]
        return self
        pass

    def cal_new(self) -> list[list[int]]:
        return [[int(wert == 3 or (orgElm == 1 and wert == 2)) for wert, orgElm in zip(lijst, org)]
                for lijst, org in zip(self.arrTotal, self.arr)]
        pass

    def show4(self):
        for lijst in self.arr:
            for elm in lijst:
                if elm == 0:
                    print(self.FalseSymbol, end=" ", sep="")
                else:
                    print(self.TrueSymbol, end=" ", sep="")
            print("\n", end="", sep="")
        return self


if __name__ == '__main__':
    c = Generation(20, alive="#", dead=" ")
    c.show4()
    for a in range(200):
        time.sleep(0.9)
        print("\n\n\n\n\n\n")
        c.NextGen().show4()
