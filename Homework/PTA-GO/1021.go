package main

import (
	. "fmt"
	. "strconv"
	. "strings"
)

func main() {
	var N string
	var appearance = make([]int, 10)
	Scanf("%s", &N)
	S := Split(N, "")
	for _, v := range S {
		num, _ := Atoi(v)
		appearance[num]++
	}
	for i, v := range appearance {
		if v != 0 {
			Printf("%d:%d\n", i, v)
		}
	}
}
