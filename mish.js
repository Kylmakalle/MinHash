//<meta http-equiv=Content-Type content="text/html; charset=utf-8">
// Source http://smirnov.spb.su/papers/form_jaccard2.php
function encode(str_a, str_b, act) {
    var outtxt = "First string: " + str_a + "\nSecond string: " + str_b;
    var set_a = str_a.split(" ");
    var set_b = str_b.split(" ");
    outtxt += "\nAccuracy=" + act;
    var min_hash = MinHash(act);

    var out = "";
    for (var key in min_hash) {
        value = min_hash[key];
        out += "key=" + key + " value=" + value + "\n";
    }
    var sig_a = min_hash.signature(set_a);
    var sig_b = min_hash.signature(set_b);
    console.log(outtxt)
    var similarity_a_b = min_hash.similarity(sig_a, sig_b);
    console.log("Strings similarity score=" + similarity_a_b);
    return similarity_a_b
}

/******************************************************************/
function Hash(size) {
    var seed = Math.floor(Math.random() * size) + 32;
    return function (string) {
        var result = 1;
        for (var i = 0; i < string.length; ++i) {
            result = (seed * result + string.charCodeAt(i)) & 0xFFFFFFFF;
        }
        return result;
    };
}

function MinHash(max_error) {
    var function_count = Math.round(1 / (max_error * max_error));  //iterations
    var functions = [];
    console.log("Iterations count=" + function_count);
    for (var i = 0; i < function_count; ++i) {
        functions[i] = Hash(function_count);
    }

    function find_min(set, function_) {
        var min = 0xFFFFFFFF;
        for (var i = 0; i < set.length; ++i) {
            var hash = function_(set[i]);
            if (hash < min) {
                min = hash;
            }
        }
        return min;
    }

    function signature(set) {
        var result = [];
        for (var i = 0; i < function_count; ++i) {
            result[i] = find_min(set, functions[i]);
        }
        return result;
    }

    function similarity(sig_a, sig_b) {
        var equal_count = 0;
        for (var i = 0; i < function_count; ++i) {
            if (sig_a[i] == sig_b[i]) ++equal_count;
        }
        return equal_count / function_count;    // for точность=0.5 ==>   function_count=4   .051 ==> 384
    }

    return {signature: signature, similarity: similarity};
}//end MinHash()


