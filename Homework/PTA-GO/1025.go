package main

import (
	"bufio"
	. "fmt"
	"os"
)

var (
	addr, v, next, head, T, N int
	addrT, valT               = make([]int, 100000), make([]int, 100000)
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
func rev(s []int) {
	for left, right := 0, len(s)-1; left < right; left, right = left+1, right-1 {
		s[left], s[right] = s[right], s[left]
	}
}
func prev(p *[]int, n1, n2 int) {
	rev((*p)[n1:n2])
}
func main() {
	Scanf("%d%d%d", &head, &T, &N)
	r := bufio.NewReader(os.Stdin)
	input := bufio.NewScanner(r)
	input.Split(bufio.ScanWords)
	for i := 0; i < T; i++ {
		input.Scan()
		addr = btoi(input.Bytes())
		input.Scan()
		valT[addr] = btoi(input.Bytes())
		input.Scan()
		addrT[addr] = btoi(input.Bytes())
	}

	S := []int{head}
	p := &S
	for i := head; addrT[i] != -1; i = addrT[i] {
		S = append(S, addrT[i])
	}

	for i, j := 0, N; j <= len(S); i, j = i+N, j+N {
		prev(p, i, j)
	}

	for i := 0; i < len(S)-1; i++ {
		Printf("%05d %d %05d\n", S[i], valT[S[i]], S[i+1])
	}
	idx := len(S) - 1
	Printf("%05d %d -1", S[idx], valT[S[idx]])
}
