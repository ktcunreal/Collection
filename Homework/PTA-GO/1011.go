package main

import (
	. "fmt"
)

func main() {
	var T, a, b, c int
	Scanf("%d", &T)

	for i := 0; i < T; i++ {
		Scanf("%d%d%d", &a, &b, &c)
		Printf("Case #%d: %v\n", i+1, a+b > c)
	}
}
