/*
    Complexity: O(n)
    Efficiency: In case n is big number, this function will become inefficient due to the linear iteration
*/
function sum_to_n_a(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}



/*
    Complexity: O(n)
    Efficiency: In case n is big number, this function may lead to stack overflow because of the recursive depth
*/
function sum_to_n_b(n: number): number {
    if (n <= 1) {
        return n;
    }
    return n + sum_to_n_b(n - 1);
}


/*
    Complexity: O(1)
    Efficiency: Using the mathematical formula, this approach is the most efficient in terms of time and memory
*/
function sum_to_n_c(n: number): number {
    return (n * (n + 1)) / 2;
}