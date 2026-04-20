---
level: 2
---

# 如何减少项目里的 if-else

## 参考答案

#### 1. **多态与策略模式**
**适用场景**：根据不同类型执行不同行为  
```typescript
if (user.role === 'admin') {
    showAdminPanel();
} else if (user.role === 'editor') {
    showEditorTools();
} else {
    showGuestView();
}

// 优化后
const roleHandlers = {
    admin: () => showAdminPanel(),
    editor: () => showEditorTools(),
    default: () => showGuestView()
};
roleHandlers[user.role]?.() || roleHandlers.default();
```
**适用场景**：状态/错误码映射  
```javascript
if (status === 200) return 'Success';
if (status === 404) return 'Not Found';
if (status === 500) return 'Server Error';

// 优化后
const statusMap = {
    200: 'Success',
    404: 'Not Found',
    500: 'Server Error'
};
return statusMap[status] || 'Unknown';
```
**适用场景**：参数校验/前置条件检查  
```typescript
function process(data) {
    if (data) {
        if (data.valid) {
            // 主要逻辑...
            return result;
        } else {
            throw Error('Invalid data');
        }
    } else {
        throw Error('No data');
    }
}

// 优化后
function process(data) {
    if (!data) throw Error('No data');
    if (!data.valid) throw Error('Invalid data');
    
    // 主要逻辑...
    return result;
}
```
**适用场景**：多条件顺序处理  
```javascript
const validators = [
    { check: (input) => !input, error: 'Input required' },
    { check: (input) => input.length < 6, error: 'Too short' },
    { check: (input) => !/\d/.test(input), error: 'Need number' }
];

function validate(input) {
    const failure = validators.find(v => v.check(input));
    return failure ? failure.error : null;
}
```
**适用场景**：简单条件赋值  
```javascript
let value;
if (input !== null) {
    value = input;
} else {
    value = defaultValue;
}

// 优化后
const value = input ?? defaultValue; // 或 input || defaultValue
```
**适用场景**：复杂状态流转  
```typescript
class Order {
    state: OrderState = new PendingState();

    nextState() {
        this.state = this.state.next();
    }
}

interface OrderState {
    next(): OrderState;
}

class ShippedState implements OrderState {
    next() { return new DeliveredState(); }
}
```
**适用场景**：条件数据转换  
```javascript
const results = data.map(item => {
    if (item.score > 90) return 'A';
    if (item.score > 80) return 'B';
    return 'C';
});

// 优化后
const gradeRules = [
    [score => score > 90, 'A'],
    [score => score > 80, 'B'],
    [() => true, 'C'] // 默认值
];

const getGrade = (score) => 
    gradeRules.find(([rule]) => rule(score))[1];

const results = data.map(item => getGrade(item.score));
```
**适用场景**：动态业务规则  
```javascript
export const DISCOUNT_RULES = [
    { condition: user => user.isVIP, discount: 0.3 },
    { condition: order => order.total > 1000, discount: 0.2 },
    { condition: () => true, discount: 0 } // 默认
];

// 业务逻辑
function getDiscount(user, order) {
    const rule = DISCOUNT_RULES.find(r => r.condition(user, order));
    return rule.discount;
}
```
