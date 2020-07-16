export const notes = (name: string) => `
# ${name} Buttons Components

## Purpose
Provides a set of components to implement ${name} buttons in a form. The ${name} components are a variant of the Choice components.
The Choice Group component is a container which displays the label with an optional hint and should contain two or more Chioce Button components. The ${name} variant of the Choice Button component represents a single ${name} button. The Hint component may be used to provide extra context to the user.

## Usage
Import the Choice Module into your application:

~~~js
@NgModule({
  ...
  imports: [LgChoiceModule],
})
~~~

and in your HTML:

~~~html
<lg-choice-group variant="${name.toLowerCase()}" [inline]="true" formControlName="color">
  Colour
  <lg-hint>Please select a colour</lg-hint>
  <lg-choice-button value="red">Red</lg-choice-button>
  <lg-choice-button value="yellow">Yellow</lg-choice-button>
</lg-choice-group>
~~~

## Inputs

### LgChoiceGroupComponent
| Name | Description | Type | Default | Required |
|------|-------------|:----:|:-----:|:-----:|
| \`\`id\`\` | HTML ID attribute, auto generated if not provided | string | 'lg-choice-group-id-\${nextUniqueId++}' | No |
| \`\`name\`\` | Set the name value for all inputs in the group, auto-generated if not provided | string | 'lg-choice-group-\${nextUniqueId++}' | No |
| \`\`value\`\` | Set the default checked choice button, must match the value of the choice button | string | null | No |
| \`\`inline\`\` | If true, displays the choice buttons inline rather than stacked | boolean | false | No |
| \`\`variant\`\` | The variant of the choice | ChoiceVariant | 'radio' | No |

### LgChoiceButtonComponent
| Name | Description | Type | Default | Required |
|------|-------------|:----:|:-----:|:-----:|
| \`\`id\`\` | HTML ID attribute, auto generated if not provided | string | 'lg-choice-button-\${++nextUniqueId}' | No |
| \`\`name\`\` | HTML name attribute | string | null | Yes |
| \`\`value\`\` | HTML value attribute | string | null | Yes |


## Using only the SCSS files

Generate the markup as show in the example below.

### ${name} group

| Class | Description |
|------|-------------|
| \`\`lg-choice-group\`\` | Adds styles to the wrapping element |
| \`\`lg-choice-group--inline\`\` | Displays the choice buttons inline, rather than stacked |

### ${name} button
| Class | Description |
|------|-------------|
| \`\`lg-choice-button__input\`\` | Adds generic styles to the choice button input element |
| \`\`lg-choice-button__label\`\` | Adds generic styles to the choice label element |
${
  name === 'Segment'
    ? `| \`\`lg-choice-button--segment\`\` | Adds styles to make the choice component look like a segment |`
    : ''
}

### Examples:
${
  name === 'Segment'
    ? `
~~~html
<div class="lg-choice-group">
  <fieldset>
    <legend class="lg-label">Color</legend>
    <div class="lg-choice--segment">
      <div class="lg-choice-button lg-choice-button--segment">
        <label class="lg-choice-button__label" for="red">Red</label>
        <input class="lg-choice-button__input" id="red" name="color" value="red" checked="true">
      </div>
      <div class="lg-choice-button lg-choice-button--segment">
        <label class="lg-choice-button__label" for="red">Blue</label>
        <input class="lg-choice-button__input" id="red" name="color" value="blue">
      </div>
    </div>
  </fieldset>
</div>
~~~
`
    : `
~~~html
<div class="lg-choice-group">
  <fieldset>
    <legend class="lg-label">Color</legend>
    <div class="lg-choice-button">
      <label class="lg-choice-button__label" for="red">Red</label>
      <input class="lg-choice-button__input" id="red" name="color" value="red" checked="true">
    </div>
    <div class="lg-choice-buttont">
      <label class="lg-choice-button__label" for="red">Blue</label>
      <input class="lg-choice-button__input" id="red" name="color" value="blue">
    </div>
  </fieldset>
</div>
~~~
`
}
`;
