# MinHash

Python version of Jaccard Distance count for strings from [JavaScript implementation](http://smirnov.spb.su/papers/form_jaccard2.php
) based on [js2py package](https://github.com/PiotrDabkowski/Js2Py)

# Installation
```bash
git clone https://github.com/Kylmakalle/MinHash.git
cd MinHash
pip install -r requirements.txt
```

# Example
```python
import js2py
js2py.translate_file('mish.js', 'mish.py')

from mish import mish
                         # str1                        # str2                        # Accuracy
similarity = mish.encode("всего одна ошибка в строке", "всего одна ашибка в строке", 0.051)
print("SIMILARITY", similarity)
```
