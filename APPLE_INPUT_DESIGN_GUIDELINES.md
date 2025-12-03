# Apple Input Field Design Guidelines

> Design specifications for creating Apple-style form inputs across the Hushh platform

---

## 🎨 Color Palette

### Primary Colors
- **System Blue (Focus)**: `#007AFF`
- **System Red (Error)**: `#FF3B30`
- **System Green (Success)**: `#34C759`

### Border Colors
- **Default/Unfocused**: `#D1D1D6`
- **Focused**: `#007AFF`
- **Error**: `#FF3B30`
- **Disabled**: `#E5E5EA`

### Text Colors
- **Primary Text**: `#1D1D1F`
- **Placeholder**: `#86868B`
- **Helper Text**: `#6E6E73`
- **Error Text**: `#FF3B30`

### Background Colors
- **Input Background**: `#FFFFFF` (pure white)
- **Page Background**: `#F5F5F7` (light gray)
- **Disabled Background**: `#F5F5F7`

---

## 📐 Dimensions & Spacing

### Input Fields
```css
height: 52px
border-width: 2px
border-radius: 16px
padding: 14px 16px
font-size: 17px
line-height: 1.4
```

### Form Layout
```css
vertical-spacing-between-inputs: 16px
label-to-input-spacing: 8px
form-container-padding: 24px
max-width: 600px
```

---

## 🎭 States & Interactions

### Default State
```css
border: 2px solid #D1D1D6
background: white
color: #1D1D1F
cursor: text
transition: border-color 0.2s ease, box-shadow 0.2s ease
```

### Focus State
```css
border: 2px solid #007AFF
outline: none
box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1) /* Optional subtle glow */
```

### Error State
```css
border: 2px solid #FF3B30
color: #1D1D1F
```

### Disabled State
```css
border: 2px solid #E5E5EA
background: #F5F5F7
color: #86868B
cursor: not-allowed
opacity: 0.6
```

### Hover State (Desktop Only)
```css
border-color: #B0B0B5 /* Slightly darker gray */
cursor: text
```

---

## ✍️ Typography

### Font Family
```css
font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif
```

### Input Text
- **Size**: 17px
- **Weight**: 400 (Regular)
- **Color**: `#1D1D1F`

### Placeholder Text
- **Size**: 17px
- **Weight**: 400 (Regular)
- **Color**: `#86868B`

### Labels (if used)
- **Size**: 15px
- **Weight**: 600 (Semibold)
- **Color**: `#1D1D1F`
- **Margin-bottom**: 8px

### Helper/Error Text
- **Size**: 13px
- **Weight**: 400 (Regular)
- **Color**: `#6E6E73` (helper) or `#FF3B30` (error)
- **Margin-top**: 6px

---

## 🎯 Design Principles

### 1. **Minimalism**
- Clean, uncluttered design
- No unnecessary shadows or gradients
- Flat, 2D aesthetic

### 2. **Clarity**
- Clear visual hierarchy
- Obvious focused state
- High contrast for readability

### 3. **Consistency**
- Same styling across all input types
- Consistent spacing and sizing
- Uniform corner radius

### 4. **Accessibility**
- High contrast ratios (WCAG AAA compliant)
- Clear focus indicators
- Readable font sizes (minimum 17px)
- Touch-friendly sizes (minimum 44px height)

### 5. **Responsive**
- Works on all screen sizes
- Touch-optimized for mobile
- Keyboard-friendly for desktop

---

## 📱 Specific Input Types

### Text/Email Inputs
```css
type: text | email
height: 52px
padding: 14px 16px
```

### Number Inputs
```css
type: number
height: 52px
padding: 14px 16px
/* Remove default spinners */
-moz-appearance: textfield
::-webkit-inner-spin-button { display: none }
```

### Phone Number (Split Layout)
```css
/* Country Code Input */
flex: 0 0 120px
height: 52px
padding: 14px 12px
text-align: center

/* Phone Number Input */
flex: 1
height: 52px
padding: 14px 16px
```

### Textarea
```css
min-height: 120px
padding: 14px 16px
resize: vertical
```

---

## 🔄 Animations & Transitions

### Border Color Transition
```css
transition: border-color 0.2s ease-in-out
```

### Focus Ring (Optional)
```css
transition: box-shadow 0.2s ease-in-out
box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1)
```

### Error Shake (Optional)
```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}

animation: shake 0.3s ease-in-out
```

---

## 💡 Implementation Notes

### Chakra UI Override
When using Chakra UI's `<Input>` component, override these props:
```tsx
<Input
  height="52px"
  fontSize="17px"
  borderWidth="2px"
  borderRadius="16px"
  borderColor="gray.300"
  _hover={{ borderColor: "gray.400" }}
  _focus={{ borderColor: "blue.500", boxShadow: "none" }}
  _invalid={{ borderColor: "red.500" }}
  _placeholder={{ color: "gray.500" }}
  px="16px"
  py="14px"
/>
```

### Custom CSS Class
```css
.apple-input {
  height: 52px;
  border: 2px solid #D1D1D6;
  border-radius: 16px;
  padding: 14px 16px;
  font-size: 17px;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
  background: white;
  color: #1D1D1F;
  transition: border-color 0.2s ease;
}

.apple-input:focus {
  border-color: #007AFF;
  outline: none;
}

.apple-input::placeholder {
  color: #86868B;
}

.apple-input.error {
  border-color: #FF3B30;
}

.apple-input:disabled {
  border-color: #E5E5EA;
  background: #F5F5F7;
  color: #86868B;
  cursor: not-allowed;
}
```

---

## 📚 References

- Apple Human Interface Guidelines
- iOS Design Patterns
- SF Pro Font Family
- Apple.com Form Patterns

---

## 🎓 Usage Examples

### Basic Input
```tsx
<FormControl>
  <FormLabel fontSize="15px" fontWeight="600" color="#1D1D1F">
    Email Address
  </FormLabel>
  <Input
    type="email"
    placeholder="john@example.com"
    height="52px"
    fontSize="17px"
    borderWidth="2px"
    borderRadius="16px"
    borderColor="#D1D1D6"
    _focus={{ borderColor: "#007AFF", boxShadow: "none" }}
    _placeholder={{ color: "#86868B" }}
  />
</FormControl>
```

### Error State
```tsx
<FormControl isInvalid>
  <Input
    type="email"
    borderColor="#FF3B30"
    _focus={{ borderColor: "#FF3B30" }}
  />
  <FormErrorMessage color="#FF3B30" fontSize="13px" mt="6px">
    Please enter a valid email address
  </FormErrorMessage>
</FormControl>
```

---

**Last Updated**: December 4, 2025  
**Version**: 1.0.0  
**Maintainer**: Hushh Technologies Design Team
