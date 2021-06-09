package main

import (
	. "fmt"
)

func counter(i int) (c int) {
	for i != 1 {
		if i%2 == 0 {
			i = i / 2
			c++
		} else {
			i = (3*i + 1) / 2
			c++
		}
	}
	return
}

func main() {
	n := 0
	Scanf("%d", &n)
	Printf("%d\n", counter(n))
}
