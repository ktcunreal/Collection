package main

import "fmt"

func main() {
	var idx, N int
	var c string
	fmt.Scanf("%d%s", &N, &c)
	S := make([]int, 22)
	S[0] = 1
	for i, j := 1, 3; i < 22; i, j = i+1, j+2 {
		S[i] = j*2 + S[i-1]
	}
	for i, v := range S {
		if N >= v {
			idx = i
		}
	}
	l := idx*2 + 1
	for i := 0; i < l/2; i++ {
		for j := 0; j < i; j++ {
			fmt.Printf(" ")
		}
		for k := 0; k < l-2*i; k++ {
			fmt.Printf("%s", c)
		}
		fmt.Printf("\n")
	}
	for i := l / 2; i >= 0; i-- {
		for j := 0; j < i; j++ {
			fmt.Printf(" ")
		}
		for k := 0; k < l-2*i; k++ {
			fmt.Printf("%s", c)
		}
		fmt.Printf("\n")
	}
	fmt.Printf("%d\n", N-S[idx])
}
