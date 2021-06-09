package main

import (
	. "fmt"
	. "strconv"
)

func main() {
	A, B, D := 0, 0, 0
	Scanf("%d%d%d", &A, &B, &D)
	n := FormatInt(int64(A+B), D)
	Printf("%v", n)
}
