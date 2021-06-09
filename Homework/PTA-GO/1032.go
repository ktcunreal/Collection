package main

import (
	"bufio"
	. "fmt"
	"os"
)

func btoi(b []byte) (res int) {
	if b[0] == 45 {
		for i := 1; i < len(b); i++ {
			v := b[i] - '0'
			res *= 10
			res += int(v)
		}
		res = -res
	} else {
		for i := 0; i < len(b); i++ {
			v := b[i] - '0'
			res *= 10
			res += int(v)
		}
	}
	return
}

func main() {
	var T, HS int
	var S = make([]int, 100010)
	Scanf("%d", &T)
	input := bufio.NewScanner(os.Stdin)
	input.Split(bufio.ScanWords)
	for i := 0; i < T; i++ {
		input.Scan()
		idx := btoi(input.Bytes())
		input.Scan()
		if s := btoi(input.Bytes()); S[idx]+s > S[HS] {
			S[idx] += s
			HS = idx
		}
	}
	Printf("%d %d", HS, S[HS])
}
