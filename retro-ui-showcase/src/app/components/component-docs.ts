import { ComponentDocConfig } from './component-doc/component-doc.types';

export const COMPONENT_DOCS: Record<string, ComponentDocConfig> = {
  button: {
    id: 'button',
    name: 'Button',
    selector: 'retro-button',
    description: 'Primary action component with variants, loading states, tone semantics, and optional link rendering.',
    category: 'Form / Action',
    badges: ['Standalone', 'OnPush', 'A11y'],
    importExample: `import { RetroButtonComponent } from '@retro-ui';`,
    basicUsage: {
      code: `<retro-button (pressed)="onClick()">confirm</retro-button>`,
      description: 'The default button is primary and responds to the pressed output.',
    },
    examples: [
      {
        title: 'Secondary action',
        description: 'Use for non-primary actions that still need emphasis.',
        code: `<retro-button variant="secondary" (pressed)="cancel()">cancel</retro-button>`,
      },
      {
        title: 'Danger action',
        description: 'Destructive actions must use tone="danger" for semantic clarity.',
        code: `<retro-button tone="danger" (pressed)="remove()">delete</retro-button>`,
      },
      {
        title: 'Loading state',
        description: 'Shows a spinner and disables interaction automatically.',
        code: `<retro-button [loading]="saving()" (pressed)="save()">save</retro-button>`,
      },
      {
        title: 'Link rendering',
        description: 'Renders as an anchor when href is provided.',
        code: `<retro-button href="/docs" variant="ghost">open docs</retro-button>`,
      },
    ],
    variants: [
      { name: 'primary', description: 'Main action. High emphasis.' },
      { name: 'secondary', description: 'Alternative action. Medium emphasis.' },
      { name: 'ghost', description: 'Low emphasis. Blends into the surface.' },
      { name: 'tone: default', description: 'Neutral semantic tone.' },
      { name: 'tone: success', description: 'Positive action tone.' },
      { name: 'tone: warning', description: 'Caution action tone.' },
      { name: 'tone: danger', description: 'Destructive action tone.' },
    ],
    states: [
      { name: 'Default', description: 'Resting state with default background and shadow.' },
      { name: 'Hover', description: 'Background shifts to accent color on primary.' },
      { name: 'Focus', description: 'Visible focus ring using --focus-ring token.' },
      { name: 'Active', description: 'Inset shadow simulates pressed state.' },
      { name: 'Disabled', description: 'Reduced opacity, pointer-events: none.' },
      { name: 'Loading', description: 'Spinner replaces label, click blocked.' },
    ],
    accessibility: [
      'Rendered as a native <button> element by default.',
      'Focus ring is visible and uses --focus-ring token.',
      'Disabled state removes the element from tab order.',
      'Loading state has aria-busy="true" and disables interaction.',
      'When href is used, renders as <a> with proper role and keyboard activation.',
    ],
    api: {
      inputs: [
        { name: 'variant', type: "'primary' | 'secondary' | 'ghost'", default: "'primary'", desc: 'Visual emphasis variant.' },
        { name: 'tone', type: "'default' | 'success' | 'warning' | 'danger'", default: "'default'", desc: 'Semantic tone for color treatment.' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", desc: 'Button size.' },
        { name: 'type', type: "'button' | 'submit' | 'reset'", default: "'button'", desc: 'HTML button type.' },
        { name: 'disabled', type: 'boolean', default: 'false', desc: 'Disables interaction.' },
        { name: 'loading', type: 'boolean', default: 'false', desc: 'Shows spinner and blocks clicks.' },
        { name: 'fullWidth', type: 'boolean', default: 'false', desc: 'Expands to 100% width.' },
        { name: 'href', type: 'string', desc: 'Renders as anchor when provided.' },
        { name: 'download', type: 'string', desc: 'Sets download attribute when href is used.' },
        { name: 'icon', type: 'string', desc: 'Text glyph shown as icon (e.g. →, +, ✕).' },
        { name: 'iconPos', type: "'left' | 'right'", default: "'left'", desc: 'Icon position relative to label.' },
        { name: 'badge', type: 'string | number', desc: 'Small counter/label overlaid on the corner.' },
        { name: 'ariaLabel', type: 'string', desc: 'Accessible label for screen readers.' },
      ],
      outputs: [
        { name: 'pressed', type: 'OutputRef<MouseEvent>', desc: 'Emitted on click/Enter/Space activation.' },
        { name: 'focused', type: 'OutputRef<FocusEvent>', desc: 'Emitted when the button receives focus.' },
        { name: 'blurred', type: 'OutputRef<FocusEvent>', desc: 'Emitted when the button loses focus.' },
      ],
    },
    customization: [
      'Use variant and tone inputs for visual changes.',
      'Override via CSS variables: --button-primary-bg, --button-primary-fg, --button-shadow.',
      'Avoid ::ng-deep; prefer wrapping in a parent with custom class.',
      'Label text is projected via ng-content inside the button.'
    ],
    bestPractices: {
      do: [
        'Use one primary button per form or dialog.',
        'Pair destructive actions with a confirmation dialog.',
        'Keep labels short and action-oriented.',
        'Use loading state for async operations.',
      ],
      dont: [
        'Do not use multiple primary buttons in the same group.',
        'Do not rely on color alone for danger tone; add confirmation.',
        'Do not use ghost buttons for primary actions.',
      ],
    },
    relatedTokens: ['--button-primary-bg', '--button-primary-fg', '--button-shadow', '--accent'],
  },

  input: {
    id: 'input',
    name: 'Input',
    selector: 'retro-input',
    description: 'Text input with prefix, suffix, clearable action, validation states, and full reactive-forms support.',
    category: 'Form / Control',
    badges: ['Standalone', 'OnPush', 'A11y', 'CVA'],
    importExample: `import { RetroInputComponent } from '@retro-ui';`,
    basicUsage: {
      code: `<retro-input [(ngModel)]="query" placeholder="Search..." />`,
      description: 'Two-way bound input with ngModel.',
    },
    examples: [
      {
        title: 'With prefix and suffix',
        code: `<retro-input prefix="$" suffix=".00" type="number" />`,
      },
      {
        title: 'Clearable search',
        code: `<retro-input type="search" [clearable]="true" placeholder="Filter..." />`,
      },
      {
        title: 'With validation error',
        code: `<retro-input [invalid]="emailInvalid" errorMessage="Invalid email format" />`,
      },
    ],
    variants: [
      { name: 'size: sm', description: 'Compact height for dense forms.' },
      { name: 'size: md', description: 'Default comfortable height.' },
      { name: 'size: lg', description: 'Large height for touch-heavy interfaces.' },
    ],
    states: [
      { name: 'Default', description: 'Resting state with --input-bg background.' },
      { name: 'Focus', description: 'Border color shifts to --accent; outline visible.' },
      { name: 'Invalid', description: 'Border uses --danger; error message displayed.' },
      { name: 'Disabled', description: 'Reduced opacity; not focusable.' },
      { name: 'Readonly', description: 'Non-editable but focusable; no error state.' },
    ],
    formsCva: {
      description: 'Implements ControlValueAccessor. Supports ngModel, formControl, and formControlName. Disabled state is handled via setDisabledState.',
      code: `<retro-input [formControl]="emailControl" placeholder="email" />`,
    },
    accessibility: [
      'Rendered as native <input> with associated <label> when label input is provided.',
      'Error messages are linked via aria-describedby.',
      'Focus ring uses --focus-ring token and is always visible.',
      'Clear button has aria-label for screen readers.',
    ],
    api: {
      inputs: [
        { name: 'value', type: 'string', default: "''", desc: 'Current value.' },
        { name: 'type', type: "'text' | 'number' | 'search' | 'password' | 'email'", default: "'text'", desc: 'HTML input type.' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", desc: 'Visual size.' },
        { name: 'placeholder', type: 'string', desc: 'Placeholder text.' },
        { name: 'ariaLabel', type: 'string', desc: 'Accessible label for screen readers.' },
        { name: 'disabled', type: 'boolean', default: 'false', desc: 'Disables the field.' },
        { name: 'readonly', type: 'boolean', default: 'false', desc: 'Read-only mode.' },
        { name: 'invalid', type: 'boolean', default: 'false', desc: 'Shows error styling.' },
        { name: 'errorMessage', type: 'string', desc: 'Text displayed when invalid.' },
        { name: 'helpText', type: 'string', desc: 'Hint text below the input.' },
        { name: 'clearable', type: 'boolean', default: 'false', desc: 'Shows clear button.' },
        { name: 'prefix', type: 'string', desc: 'Text before the input value.' },
        { name: 'suffix', type: 'string', desc: 'Text after the input value.' },
        { name: 'fullWidth', type: 'boolean', default: 'false', desc: 'Expands to 100% width.' },
      ],
      outputs: [
        { name: 'valueChange', type: 'EventEmitter<string>', desc: 'Emits on every value change.' },
        { name: 'cleared', type: 'EventEmitter<void>', desc: 'Emitted when the clear button is clicked.' },
      ],
      methods: [
        { name: 'focus()', type: '() => void', desc: 'Focuses and selects the native input element.' },
      ],
      cva: ['ngModel', 'formControl', 'formControlName'],
    },
    customization: [
      'Use --input-bg for background color.',
      'Use --line for border color.',
      'Use --focus-ring for focus outline.',
      'Avoid overriding internal padding; use size input instead.',
    ],
    bestPractices: {
      do: [
        'Always provide a label or aria-label.',
        'Use helpText for formatting hints.',
        'Use errorMessage together with invalid.',
        'Use clearable for search and filter fields.',
      ],
      dont: [
        'Do not use type="number" for non-numeric data.',
        'Do not omit errorMessage when invalid is used.',
        'Do not nest inputs inside label without explicit association.',
      ],
    },
    relatedTokens: ['--input-bg', '--line', '--focus-ring', '--danger'],
  },

  select: {
    id: 'select',
    name: 'Select',
    selector: 'retro-select',
    description: 'Dropdown select for small option lists and quick configuration changes.',
    category: 'Form / Control',
    badges: ['Standalone', 'OnPush', 'A11y', 'CVA'],
    importExample: `import { RetroSelectComponent } from '@retro-ui';`,
    basicUsage: {
      code: `<retro-select [options]="sizeOptions" [(ngModel)]="size" />`,
      description: 'Bound to ngModel with an array of options.',
    },
    examples: [
      {
        title: 'Reactive form',
        code: `<retro-select [options]="themes" [formControl]="themeControl" />`,
      },
      {
        title: 'Disabled option',
        description: 'Individual options can be marked disabled in the options array.',
        code: `const options = [{ label: 'A', value: 'a' }, { label: 'B', value: 'b', disabled: true }];`,
      },
    ],
    variants: [
      { name: 'size: sm', description: 'Compact height.' },
      { name: 'size: md', description: 'Default height.' },
    ],
    states: [
      { name: 'Default', description: 'Resting closed state.' },
      { name: 'Open', description: 'Dropdown expanded, first non-disabled option focused.' },
      { name: 'Focus', description: 'Trigger has visible focus ring.' },
      { name: 'Disabled', description: 'Cannot open or change value.' },
    ],
    formsCva: {
      description: 'Supports ngModel and reactive forms. Emits valueChange and updates form control on selection.',
      code: `<retro-select [options]="modes" [formControl]="modeControl" />`,
    },
    accessibility: [
      'Trigger is a native <button> with aria-expanded and aria-haspopup.',
      'Options are in a role="listbox" with role="option" items.',
      'Keyboard: Arrow keys navigate, Enter/Space selects, Escape closes.',
      'Focus is trapped inside the dropdown while open.',
    ],
    api: {
      inputs: [
        { name: 'options', type: '{ label: string; value: string; disabled?: boolean }[]', default: '[]', desc: 'Option list.' },
        { name: 'value', type: 'string', desc: 'Currently selected value.' },
        { name: 'size', type: "'sm' | 'md'", default: "'md'", desc: 'Select size.' },
        { name: 'disabled', type: 'boolean', default: 'false', desc: 'Disables interaction.' },
        { name: 'fullWidth', type: 'boolean', default: 'false', desc: 'Expands to 100% width.' },
      ],
      outputs: [
        { name: 'valueChange', type: 'EventEmitter<string>', desc: 'Emits when selection changes.' },
      ],
      cva: ['ngModel', 'formControl', 'formControlName'],
    },
    customization: [
      'Background uses --input-bg.',
      'Border uses --line.',
      'Focus ring uses --focus-ring.',
    ],
    bestPractices: {
      do: [
        'Use for 3–10 options.',
        'Provide a default value when possible.',
        'Sort options logically.',
      ],
      dont: [
        'Do not use for boolean choices; use checkbox or segmented.',
        'Do not use for long lists; consider a search input.',
      ],
    },
    relatedTokens: ['--input-bg', '--line', '--focus-ring'],
  },

  checkbox: {
    id: 'checkbox',
    name: 'Checkbox',
    selector: 'retro-checkbox',
    description: 'Standalone checkbox with checked, readonly, invalid, and indeterminate states.',
    category: 'Form / Control',
    badges: ['Standalone', 'OnPush', 'A11y', 'CVA'],
    importExample: `import { RetroCheckboxComponent } from '@retro-ui';`,
    basicUsage: {
      code: `<retro-checkbox label="Enable notifications" [(ngModel)]="enabled" />`,
    },
    examples: [
      {
        title: 'Indeterminate state',
        description: 'Use for parent checkboxes in a hierarchy.',
        code: `<retro-checkbox label="Select all" [indeterminate]="partial" [(ngModel)]="all" />`,
      },
      {
        title: 'Validation',
        code: `<retro-checkbox label="Accept terms" [invalid]="!accepted" />`,
      },
    ],
    variants: [
      { name: 'size: sm', description: 'Compact checkbox and label.' },
      { name: 'size: md', description: 'Default size.' },
    ],
    states: [
      { name: 'Unchecked', description: 'Default empty state.' },
      { name: 'Checked', description: 'Filled with accent color.' },
      { name: 'Indeterminate', description: 'Dash inside the box.' },
      { name: 'Invalid', description: 'Border uses --danger.' },
      { name: 'Disabled', description: 'Reduced opacity.' },
      { name: 'Readonly', description: 'Checked state shown but not editable.' },
    ],
    formsCva: {
      description: 'Implements ControlValueAccessor for boolean values. Supports ngModel and reactive forms.',
      code: `<retro-checkbox [formControl]="agreeControl" label="I agree" />`,
    },
    accessibility: [
      'Native <input type="checkbox"> with hidden visual replacement.',
      'Label is clickable and associated via for/id.',
      'Focus ring visible on the custom box.',
      'Indeterminate state exposed to assistive technology via aria-checked="mixed".',
    ],
    api: {
      inputs: [
        { name: 'label', type: 'string', desc: 'Text label displayed next to the checkbox.' },
        { name: 'checked', type: 'boolean', default: 'false', desc: 'Checked state.' },
        { name: 'indeterminate', type: 'boolean', default: 'false', desc: 'Indeterminate visual state.' },
        { name: 'disabled', type: 'boolean', default: 'false', desc: 'Disables interaction.' },
        { name: 'readonly', type: 'boolean', default: 'false', desc: 'Non-editable.' },
        { name: 'invalid', type: 'boolean', default: 'false', desc: 'Error styling.' },
        { name: 'size', type: "'sm' | 'md'", default: "'md'", desc: 'Checkbox size.' },
      ],
      outputs: [
        { name: 'checkedChange', type: 'EventEmitter<boolean>', desc: 'Emits when checked state changes.' },
      ],
      cva: ['ngModel', 'formControl', 'formControlName'],
    },
    customization: [
      'Checked fill uses --accent.',
      'Border uses --line.',
      'Invalid border uses --danger.',
    ],
    bestPractices: {
      do: [
        'Use for independent boolean settings.',
        'Use indeterminate for parent nodes in trees.',
        'Always provide a label.',
      ],
      dont: [
        'Do not use for mutually exclusive choices; use segmented or radio.',
        'Do not nest checkboxes without visual grouping.',
      ],
    },
    relatedTokens: ['--accent', '--line', '--danger'],
  },

  range: {
    id: 'range',
    name: 'Range',
    selector: 'retro-range',
    description: 'Slider for continuous value selection with immediate feedback.',
    category: 'Form / Control',
    badges: ['Standalone', 'OnPush', 'A11y', 'CVA'],
    importExample: `import { RetroRangeComponent } from '@retro-ui';`,
    basicUsage: {
      code: `<retro-range [min]="0" [max]="100" [(ngModel)]="volume" />`,
    },
    examples: [
      {
        title: 'With step',
        code: `<retro-range [min]="0" [max]="10" [step]="0.5" [(ngModel)]="rating" />`,
      },
      {
        title: 'Full width in a form',
        code: `<retro-range [fullWidth]="true" [formControl]="zoomControl" />`,
      },
    ],
    variants: [],
    states: [
      { name: 'Default', description: 'Resting track and thumb.' },
      { name: 'Focus', description: 'Thumb has visible focus ring.' },
      { name: 'Dragging', description: 'Thumb scale increases slightly.' },
      { name: 'Disabled', description: 'Track and thumb reduce opacity.' },
    ],
    formsCva: {
      description: 'Implements ControlValueAccessor for number values.',
      code: `<retro-range [formControl]="brightness" [min]="0" [max]="255" />`,
    },
    accessibility: [
      'Rendered as native <input type="range">.',
      'Keyboard: Arrow keys adjust by step, Page Up/Down by larger increment.',
      'Label should describe what the value controls.',
    ],
    api: {
      inputs: [
        { name: 'value', type: 'number', default: '0', desc: 'Current value.' },
        { name: 'min', type: 'number', default: '0', desc: 'Minimum value.' },
        { name: 'max', type: 'number', default: '100', desc: 'Maximum value.' },
        { name: 'step', type: 'number', default: '1', desc: 'Step increment.' },
        { name: 'disabled', type: 'boolean', default: 'false', desc: 'Disables interaction.' },
        { name: 'fullWidth', type: 'boolean', default: 'false', desc: 'Expands to 100% width.' },
      ],
      outputs: [
        { name: 'valueChange', type: 'EventEmitter<number>', desc: 'Emits on every value change.' },
      ],
      cva: ['ngModel', 'formControl', 'formControlName'],
    },
    customization: [
      'Track background uses --sunken.',
      'Thumb uses --accent.',
      'Disabled uses --muted.',
    ],
    bestPractices: {
      do: [
        'Always show the current value near the slider.',
        'Use step values that make sense for the domain.',
        'Provide min/max labels when the scale is not obvious.',
      ],
      dont: [
        'Do not use for discrete categories; use select or segmented.',
        'Do not hide the current value.',
      ],
    },
    relatedTokens: ['--accent', '--sunken', '--muted'],
  },

  segmented: {
    id: 'segmented',
    name: 'Segmented',
    selector: 'retro-segmented',
    description: 'Segmented control for mutually exclusive choices. Compact alternative to radio buttons.',
    category: 'Form / Control',
    badges: ['Standalone', 'OnPush', 'A11y', 'CVA'],
    importExample: `import { RetroSegmentedComponent } from '@retro-ui';`,
    basicUsage: {
      code: `<retro-segmented [options]="['grid', 'list']" [(ngModel)]="viewMode" />`,
    },
    examples: [
      {
        title: 'Vertical layout',
        code: `<retro-segmented direction="col" [options]="['asc', 'desc']" [(ngModel)]="sortDir" />`,
      },
      {
        title: 'Reactive form',
        code: `<retro-segmented [options]="['light', 'dark', 'auto']" [formControl]="themeControl" />`,
      },
    ],
    variants: [
      { name: 'direction: row', description: 'Horizontal segments (default).' },
      { name: 'direction: col', description: 'Vertical stack of segments.' },
    ],
    states: [
      { name: 'Default', description: 'Resting segments with panel-alt background.' },
      { name: 'Selected', description: 'Active segment uses --accent background.' },
      { name: 'Focus', description: 'Focus ring on the active or navigated segment.' },
      { name: 'Disabled', description: 'Entire control or individual segments disabled.' },
    ],
    formsCva: {
      description: 'Implements ControlValueAccessor for string values.',
      code: `<retro-segmented [options]="['sm', 'md', 'lg']" [formControl]="sizeControl" />`,
    },
    accessibility: [
      'Role="radiogroup" with role="radio" items.',
      'Keyboard: Arrow keys move selection, Enter/Space activates.',
      'Selected state communicated via aria-checked.',
      'Focus is managed within the group.',
    ],
    api: {
      inputs: [
        { name: 'options', type: 'string[]', default: '[]', desc: 'List of option labels/values.' },
        { name: 'value', type: 'string', desc: 'Currently selected value.' },
        { name: 'direction', type: "'row' | 'col'", default: "'row'", desc: 'Layout direction.' },
        { name: 'disabled', type: 'boolean', default: 'false', desc: 'Disables interaction.' },
      ],
      outputs: [
        { name: 'valueChange', type: 'EventEmitter<string>', desc: 'Emits when selection changes.' },
      ],
      cva: ['ngModel', 'formControl', 'formControlName'],
    },
    customization: [
      'Selected background uses --accent.',
      'Selected text uses --line (light) or --desktop (dark).',
      'Border uses --line.',
    ],
    bestPractices: {
      do: [
        'Use for 2–5 mutually exclusive options.',
        'Use row for horizontal space, col for vertical stacking.',
        'Keep labels short (one word when possible).',
      ],
      dont: [
        'Do not use for more than 5 options; use select.',
        'Do not use for multi-select; use checkbox.',
      ],
    },
    relatedTokens: ['--accent', '--line', '--panel-alt'],
  },

  modal: {
    id: 'modal',
    name: 'Modal',
    selector: 'retro-modal',
    description: 'Modal dialog with overlay, backdrop close, keyboard navigation, and named slots.',
    category: 'Container / Overlay',
    badges: ['Standalone', 'OnPush', 'A11y', 'Composable'],
    importExample: `import { RetroModalComponent } from '@retro-ui';`,
    basicUsage: {
      code: `<retro-modal [open]="open()" title="Confirm" (closed)="open.set(false)">
  <p>Are you sure?</p>
  <div modal-actions>
    <retro-button variant="ghost" (pressed)="open.set(false)">cancel</retro-button>
    <retro-button (pressed)="confirm()">confirm</retro-button>
  </div>
</retro-modal>`,
    },
    examples: [
      {
        title: 'With subtitle',
        code: `<retro-modal [open]="open()" title="Settings" subtitle="Interface preferences">
  <!-- body -->
</retro-modal>`,
      },
      {
        title: 'Size variants',
        code: `<retro-modal [open]="open()" size="lg" title="Details">
  <!-- body -->
</retro-modal>`,
      },
    ],
    variants: [
      { name: 'size: sm', description: 'Compact dialog.' },
      { name: 'size: md', description: 'Default size.' },
      { name: 'size: lg', description: 'Wide dialog for rich content.' },
    ],
    states: [
      { name: 'Closed', description: 'Not rendered in DOM or hidden.' },
      { name: 'Open', description: 'Visible with overlay and elevation.' },
      { name: 'Focus trapped', description: 'Tab cycles inside the modal.' },
    ],
    accessibility: [
      'Role="dialog" with aria-modal="true".',
      'Focus is trapped inside while open.',
      'Escape key closes the modal.',
      'Click on backdrop closes if closeOnBackdrop is true.',
      'Focus is restored to the trigger on close.',
    ],
    api: {
      inputs: [
        { name: 'open', type: 'boolean', default: 'false', desc: 'Controls visibility.' },
        { name: 'title', type: 'string', desc: 'Modal title.' },
        { name: 'subtitle', type: 'string', desc: 'Modal subtitle.' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", desc: 'Modal width.' },
        { name: 'closeOnBackdrop', type: 'boolean', default: 'true', desc: 'Close on backdrop click.' },
        { name: 'closeOnEscape', type: 'boolean', default: 'true', desc: 'Close on Escape key.' },
        { name: 'showCloseButton', type: 'boolean', default: 'true', desc: 'Show close button.' },
      ],
      outputs: [
        { name: 'closed', type: 'OutputRef<void>', desc: 'Emitted when modal closes.' },
      ],
      slots: [
        { name: '(default)', desc: 'Main body content.' },
        { name: 'modal-actions', desc: 'Footer action buttons.' },
      ],
    },
    customization: [
      'Overlay background uses --desktop with opacity.',
      'Panel uses --panel with --shadow-lg.',
      'Use size input for width control.',
    ],
    bestPractices: {
      do: [
        'Always provide a clear title.',
        'Use modal-actions slot for primary actions.',
        'Close on Escape and backdrop by default.',
      ],
      dont: [
        'Do not nest modals.',
        'Do not use for non-critical alerts; use toast.',
        'Do not forget to restore focus after close.',
      ],
    },
    relatedTokens: ['--panel', '--shadow-lg', '--desktop'],
  },

  tabs: {
    id: 'tabs',
    name: 'Tabs',
    selector: 'retro-tabs',
    description: 'Tab navigation with keyboard support, disabled tabs, and content projection.',
    category: 'Navigation / Layout',
    badges: ['Standalone', 'OnPush', 'A11y', 'Composable'],
    importExample: `import { RetroTabsComponent, RetroTab } from '@retro-ui';`,
    basicUsage: {
      code: `<retro-tabs [tabs]="tabItems" [(active)]="activeTab">
  @if (activeTab() === 'overview') { <p>Overview content</p> }
  @if (activeTab() === 'settings') { <p>Settings content</p> }
</retro-tabs>`,
    },
    examples: [
      {
        title: 'With icons and badges',
        code: `const tabs: RetroTab[] = [
  { id: 'files', label: 'Files', icon: '▶', badge: 3 },
  { id: 'logs', label: 'Logs', icon: '◈' },
];`,
      },
      {
        title: 'Disabled tab',
        code: `const tabs: RetroTab[] = [
  { id: 'preview', label: 'Preview' },
  { id: 'source', label: 'Source', disabled: true },
];`,
      },
    ],
    variants: [
      { name: 'variant: default', description: 'Standard tab bar.' },
      { name: 'variant: terminal', description: 'Monospace terminal style.' },
    ],
    states: [
      { name: 'Default', description: 'Resting tab.' },
      { name: 'Active', description: 'Selected tab with accent underline.' },
      { name: 'Focus', description: 'Visible focus ring.' },
      { name: 'Disabled', description: 'Non-interactive, reduced opacity.' },
    ],
    accessibility: [
      'Role="tablist" with role="tab" items.',
      'Keyboard: Arrow keys navigate, Home/End jump to extremes.',
      'Active tab has aria-selected="true".',
      'Disabled tabs have tabindex="-1".',
    ],
    api: {
      inputs: [
        { name: 'tabs', type: 'RetroTab[]', default: '[]', desc: 'Tab definitions.' },
        { name: 'active', type: 'string', desc: 'Currently active tab id.' },
        { name: 'variant', type: "'default' | 'terminal'", default: "'default'", desc: 'Visual style.' },
      ],
      outputs: [
        { name: 'activeChange', type: 'EventEmitter<string>', desc: 'Emits when active tab changes.' },
      ],
      slots: [
        { name: '(default)', desc: 'Tab panel content projected below the tab bar.' },
      ],
    },
    customization: [
      'Active indicator uses --accent.',
      'Text uses --text.',
      'Disabled uses --muted.',
    ],
    bestPractices: {
      do: [
        'Use for 2–6 related views.',
        'Keep tab labels short and clear.',
        'Use badge for counts, not for status.',
      ],
      dont: [
        'Do not use for navigation between unrelated pages.',
        'Do not hide critical content behind a disabled tab.',
      ],
    },
    relatedTokens: ['--accent', '--text', '--muted'],
  },

  toast: {
    id: 'toast',
    name: 'Toast',
    selector: 'retro-toast',
    description: 'Notification host for ephemeral messages. Positioned fixed, auto-dismissible.',
    category: 'Feedback',
    badges: ['Standalone', 'OnPush', 'A11y'],
    importExample: `import { RetroToastComponent, ToastService } from '@retro-ui';`,
    basicUsage: {
      code: `// inject ToastService
this.toastService.show({ type: 'info', message: 'Saved successfully' });`,
    },
    examples: [
      {
        title: 'Error with details',
        code: `this.toastService.show({
  type: 'error',
  message: 'Connection failed',
  details: { code: 'ECONNREFUSED', service: 'api' }
});`,
      },
      {
        title: 'Sticky toast',
        code: `this.toastService.show({
  type: 'warning',
  message: 'Maintenance scheduled',
  sticky: true
});`,
      },
    ],
    variants: [
      { name: 'type: info', description: 'General notification.' },
      { name: 'type: success', description: 'Operation completed.' },
      { name: 'type: warning', description: 'Attention needed.' },
      { name: 'type: error', description: 'Failure or exception.' },
    ],
    states: [
      { name: 'Visible', description: 'Toast is displayed.' },
      { name: 'Expiring', description: 'Progress bar indicates remaining time.' },
      { name: 'Hovered', description: 'Timer pauses while hovered.' },
    ],
    accessibility: [
      'Container has aria-live="polite" and role="region".',
      'Individual toasts have role="alert" or role="status" depending on severity.',
      'Dismiss button has aria-label.',
      'Auto-dismiss is paused on hover and focus.',
    ],
    api: {
      inputs: [
        { name: 'position', type: "'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'", default: "'bottom-right'", desc: 'Host position.' },
        { name: 'maxVisible', type: 'number', default: '5', desc: 'Maximum simultaneous toasts.' },
      ],
      outputs: [],
    },
    customization: [
      'Type colors map to --info, --success, --accent, --danger.',
      'Background uses --panel with --shadow-lg.',
    ],
    bestPractices: {
      do: [
        'Use for non-blocking feedback.',
        'Keep messages under 120 characters.',
        'Use sticky for errors that require action.',
      ],
      dont: [
        'Do not use for critical alerts that block workflow; use modal.',
        'Do not stack more than 3–5 toasts.',
        'Do not use toasts for form field errors.',
      ],
    },
    relatedTokens: ['--info', '--success', '--accent', '--danger', '--shadow-lg'],
  },

  message: {
    id: 'message',
    name: 'Message',
    selector: 'retro-message',
    description: 'Inline message block with severity, variant, and optional dismissal.',
    category: 'Feedback',
    badges: ['Standalone', 'OnPush', 'A11y'],
    importExample: `import { RetroMessageComponent } from '@retro-ui';`,
    basicUsage: {
      code: `<retro-message severity="info" text="New version available" />`,
    },
    examples: [
      {
        title: 'Closable warning',
        code: `<retro-message severity="warning" text="Deprecated API" [closable]="true" />`,
      },
      {
        title: 'With custom icon',
        code: `<retro-message severity="success" text="Done" icon="✓" />`,
      },
    ],
    variants: [
      { name: 'severity: info', description: 'Neutral informational message.' },
      { name: 'severity: success', description: 'Positive outcome.' },
      { name: 'severity: warning', description: 'Caution or deprecation.' },
      { name: 'severity: error', description: 'Failure or blocking issue.' },
      { name: 'variant: solid', description: 'Filled background.' },
      { name: 'variant: outlined', description: 'Border-only treatment.' },
    ],
    states: [
      { name: 'Visible', description: 'Message is displayed.' },
      { name: 'Dismissed', description: 'Removed from DOM after close animation.' },
    ],
    accessibility: [
      'Role="alert" for error/warning, role="status" for info/success.',
      'Closable messages have an accessible dismiss button.',
      'Icon is decorative by default; override with aria-label if informative.',
    ],
    api: {
      inputs: [
        { name: 'severity', type: "'info' | 'success' | 'warning' | 'error'", default: "'info'", desc: 'Semantic severity.' },
        { name: 'variant', type: "'filled' | 'outlined' | 'ghost'", default: "'filled'", desc: 'Visual treatment.' },
        { name: 'text', type: 'string', default: "''", desc: 'Message text.' },
        { name: 'icon', type: 'string', desc: 'Override icon glyph.' },
        { name: 'closable', type: 'boolean', default: 'false', desc: 'Show dismiss button.' },
      ],
      outputs: [
        { name: 'msgClosed', type: 'OutputRef<void>', desc: 'Emitted when dismissed.' },
      ],
      methods: [
        { name: 'close()', type: '() => void', desc: 'Dismisses the message and emits msgClosed.' },
      ],
    },
    customization: [
      'Severity colors map to --info, --success, --accent, --danger.',
      'Background uses severity color at low opacity.',
    ],
    bestPractices: {
      do: [
        'Use inline messages for form-level or section-level feedback.',
        'Pair error messages with specific field errors.',
        'Use closable for non-blocking informative messages.',
      ],
      dont: [
        'Do not use for page-level notifications; use toast.',
        'Do not stack multiple messages without grouping.',
      ],
    },
    relatedTokens: ['--info', '--success', '--accent', '--danger'],
  },

  'retro-data-grid': {
    id: 'retro-data-grid',
    name: 'Data Grid',
    selector: 'retro-data-grid',
    description: 'Data grid with sorting, column filtering, search, expandable rows, and pagination integration.',
    category: 'Data / Display',
    badges: ['Standalone', 'OnPush', 'A11y', 'Composable'],
    importExample: `import { RetroDataGridComponent, createRetroTable } from '@retro-ui';`,
    basicUsage: {
      code: `<retro-data-grid title="Users" [columns]="cols" [rowCount]="rows.length">
  @for (row of rows; track row.id) {
    <retro-grid-row>
      <span>{{ row.name }}</span>
      <span>{{ row.role }}</span>
    </retro-grid-row>
  }
</retro-data-grid>`,
    },
    examples: [
      {
        title: 'With createRetroTable helper',
        description: 'The helper manages sort, search, filter, and pagination state.',
        code: `const table = createRetroTable({
  rows: data,
  searchFields: ['name', 'email'],
  filterFields: ['status'],
  pageSize: 10
});

<retro-data-grid
  [columns]="cols"
  [rowCount]="table.totalCount()"
  [searchable]="true"
  [searchQuery]="table.searchQuery()"
  [sortState]="table.sortState()"
  (searchChange)="table.setSearch($event)"
  (sortChange)="table.toggleSort($event)"
>`,
      },
      {
        title: 'Expandable rows',
        code: `<retro-expandable-row>
  <span>{{ row.name }}</span>
  <div detail>
    <strong>Email:</strong> {{ row.email }}
  </div>
</retro-expandable-row>`,
      },
    ],
    variants: [],
    states: [
      { name: 'Loading', description: 'Skeleton rows displayed.' },
      { name: 'Empty', description: 'Empty state message shown.' },
      { name: 'Sorted', description: 'Column header shows sort indicator.' },
      { name: 'Filtered', description: 'Active filters shown in chip bar.' },
    ],
    accessibility: [
      'Table uses semantic <table> structure when possible.',
      'Sortable headers have aria-sort.',
      'Expandable rows use aria-expanded.',
      'Keyboard navigation supported within the grid.',
    ],
    api: {
      inputs: [
        { name: 'title', type: 'string', desc: 'Grid title.', required: true },
        { name: 'subtitle', type: 'string', default: "''", desc: 'Grid subtitle.' },
        { name: 'columns', type: 'GridColumn[]', default: '[]', desc: 'Column definitions.' },
        { name: 'rowCount', type: 'number | null', default: 'null', desc: 'Total row count for header.' },
        { name: 'emptyMessage', type: 'string', default: "'no records'", desc: 'Message shown when no rows.' },
        { name: 'addLabel', type: 'string | null', desc: 'Label for the add button.' },
        { name: 'rowSize', type: "'sm' | 'md' | 'lg'", default: "'md'", desc: 'Row height preset.' },
        { name: 'resizable', type: 'boolean', default: 'false', desc: 'Enable column drag-resize.' },
        { name: 'columnPicker', type: 'boolean', default: 'false', desc: 'Enable column visibility toggle.' },
        { name: 'filterRulesEnabled', type: 'boolean', default: 'false', desc: 'Enable advanced filter rules UI.' },
        { name: 'sortState', type: 'SortState', default: "{ field: '', dir: null }", desc: 'Current sort configuration.' },
        { name: 'searchable', type: 'boolean', default: 'false', desc: 'Enable search input.' },
        { name: 'searchPlaceholder', type: 'string', default: "'search...'", desc: 'Search input placeholder.' },
        { name: 'searchQuery', type: 'string', desc: 'Current search value.' },
        { name: 'columnFilters', type: 'Record<string, string[]>', default: '{}', desc: 'Active checkbox filters per column.' },
        { name: 'filterOptionsMap', type: 'Record<string, string[]>', default: '{}', desc: 'Available filter values per column.' },
        { name: 'filterRules', type: 'FilterRule[]', default: '[]', desc: 'Advanced filter rules.' },
        { name: 'hiddenCols', type: 'Set<string>', default: 'new Set()', desc: 'Hidden column keys.' },
        { name: 'colWidths', type: 'Record<string, number>', default: '{}', desc: 'Column width overrides (px).' },
      ],
      outputs: [
        { name: 'addClick', type: 'OutputRef<void>', desc: 'Add button clicked.' },
        { name: 'sortChange', type: 'OutputRef<string>', desc: 'Sort toggled for a column.' },
        { name: 'searchChange', type: 'OutputRef<string>', desc: 'Search value changed.' },
        { name: 'columnFilterChange', type: 'OutputRef<{ field: string; values: string[] }>', desc: 'Checkbox filter changed.' },
        { name: 'filterRuleAdd', type: 'OutputRef<void>', desc: 'Add filter rule requested.' },
        { name: 'filterRuleRemove', type: 'OutputRef<string>', desc: 'Filter rule removed (by id).' },
        { name: 'filterRuleUpdate', type: 'OutputRef<{ id: string } & Partial<FilterRule>>', desc: 'Filter rule updated.' },
        { name: 'filterRuleClear', type: 'OutputRef<void>', desc: 'All filter rules cleared.' },
        { name: 'colVisibilityToggle', type: 'OutputRef<string>', desc: 'Column visibility toggled.' },
        { name: 'colVisibilityShowAll', type: 'OutputRef<void>', desc: 'Show all columns requested.' },
        { name: 'colWidthChange', type: 'OutputRef<{ key: string; width: number }>', desc: 'Column width changed by drag.' },
      ],
      slots: [
        { name: '(default)', desc: 'Row content projected as <retro-grid-row> or <retro-expandable-row>.' },
        { name: '[grid-filter]', desc: 'Optional filter bar projected above the grid body (e.g. <retro-filter-bar grid-filter>).' },
      ],
    },
    customization: [
      'Header background uses --panel-alt.',
      'Row borders use --line-soft.',
      'Sort indicator uses --accent.',
    ],
    bestPractices: {
      do: [
        'Use createRetroTable for standard filter/sort/paginate patterns.',
        'Provide column widths for stable layout.',
        'Use expandable rows for detail views.',
      ],
      dont: [
        'Do not render hundreds of rows without pagination or virtual scroll.',
        'Do not forget to track rows by a stable identifier.',
      ],
    },
    relatedTokens: ['--panel-alt', '--line-soft', '--accent'],
  },

  terminal: {
    id: 'terminal',
    name: 'Terminal',
    selector: 'retro-terminal',
    description: 'Interactive terminal with command history, tab completion, typewriter effect, and registered commands.',
    category: 'Interactive / Display',
    badges: ['Standalone', 'OnPush', 'A11y'],
    importExample: `import { RetroTerminalComponent, TerminalCommand } from '@retro-ui';`,
    basicUsage: {
      code: `<retro-terminal
  prompt="user@system:~$ "
  [commands]="myCommands"
  (commandRun)="onCommand($event)"
/>`,
    },
    examples: [
      {
        title: 'Async command',
        description: 'Commands can return promises for async output.',
        code: `{
  name: 'status',
  description: 'Show system status',
  run: async () => {
    await delay(400);
    return [{ type: 'success', text: '● api-server   running' }];
  }
}`,
      },
      {
        title: 'Command with arguments',
        code: `{
  name: 'echo',
  usage: 'message',
  run: (args) => [{ type: 'stdout', text: args.join(' ') }]
}`,
      },
    ],
    variants: [],
    states: [
      { name: 'Idle', description: 'Waiting for input.' },
      { name: 'Typing', description: 'Typewriter effect in progress.' },
      { name: 'Processing', description: 'Command executing.' },
      { name: 'Error', description: 'Command not found or failed.' },
    ],
    accessibility: [
      'Terminal output is a live region with aria-live="polite".',
      'Input has an accessible label.',
      'Focus is managed on the input field.',
      'Color is not the sole indicator of line type; each line has a prefix symbol.',
    ],
    api: {
      inputs: [
        { name: 'prompt', type: 'string', default: "'user@retro:~$ '", desc: 'Prompt string.' },
        { name: 'greeting', type: 'string[]', default: '[]', desc: 'Initial lines shown on startup.' },
        { name: 'commands', type: 'TerminalCommand[]', default: '[]', desc: 'Registered commands.' },
        { name: 'maxLines', type: 'number', default: '500', desc: 'Maximum lines kept in history.' },
        { name: 'typewriterSpeed', type: 'number', default: '16', desc: 'Characters per second (0 = instant).' },
        { name: 'height', type: 'string', default: "'400px'", desc: 'Terminal height CSS value.' },
        { name: 'windowTitle', type: 'string', default: "'terminal'", desc: 'Window title when framed.' },
        { name: 'autofocus', type: 'boolean', default: 'true', desc: 'Focus input on mount.' },
      ],
      outputs: [
        { name: 'commandRun', type: 'OutputRef<{ cmd: string; args: string[] }>', desc: 'Emitted after command execution.' },
      ],
      methods: [
        { name: 'focus()', type: '() => void', desc: 'Focuses the terminal input field.' },
        { name: 'print()', type: '(text: string, type?: TerminalLineType) => void', desc: 'Appends a line to the terminal output.' },
        { name: 'clear()', type: '() => void', desc: 'Clears all output lines.' },
      ],
    },
    customization: [
      'Background uses --sunken.',
      'Text uses --text.',
      'Success lines use --success.',
      'Error lines uses --danger.',
    ],
    bestPractices: {
      do: [
        'Keep command names short and memorable.',
        'Provide usage hints for commands with arguments.',
        'Use async run for network or heavy operations.',
        'Print help for unknown commands.',
      ],
      dont: [
        'Do not use the terminal for critical user workflows.',
        'Do not expose sensitive operations without confirmation.',
      ],
    },
    relatedTokens: ['--sunken', '--text', '--success', '--danger'],
  },

  win: {
    id: 'win',
    name: 'Window Frame',
    selector: 'retro-window',
    description: 'Base window container for shells, panels, and retro-styled blocks with title bar, controls, and footer slots.',
    category: 'Container / Overlay',
    badges: ['Standalone', 'OnPush', 'A11y', 'Composable'],
    importExample: `import { RetroWindowComponent } from '@retro-ui';`,
    basicUsage: {
      code: `<retro-window title="Explorer" subtitle="~/projects">
  <p>Window content goes here.</p>
</retro-window>`,
    },
    examples: [
      {
        title: 'With controls',
        code: `<retro-window title="Terminal" [controls]="['minimize', 'maximize', 'close']">
  <retro-terminal [commands]="cmds" />
</retro-window>`,
      },
      {
        title: 'With footer',
        code: `<retro-window title="Status" [showControls]="true">
  <p>Main content</p>
  <div window-footer>3 records · 12ms</div>
</retro-window>`,
      },
    ],
    variants: [
      { name: 'variant: default', description: 'Standard panel window.' },
      { name: 'variant: terminal', description: 'Monospace terminal style.' },
      { name: 'variant: system', description: 'System alert window.' },
      { name: 'variant: alert', description: 'Error/danger window treatment.' },
      { name: 'variant: ghost', description: 'Borderless subtle window.' },
      { name: 'padding: none', description: 'No internal padding.' },
      { name: 'padding: sm', description: 'Small padding.' },
      { name: 'padding: md', description: 'Default padding.' },
      { name: 'padding: lg', description: 'Large padding.' },
    ],
    states: [
      { name: 'Default', description: 'Resting window with border and shadow.' },
      { name: 'Loading', description: 'Loading spinner overlays content.' },
      { name: 'Scrollable', description: 'Content scrolls internally.' },
    ],
    accessibility: [
      'Title bar uses semantic heading structure.',
      'Window controls have aria-label descriptions.',
      'Focus is managed within the window when modal-like.',
    ],
    api: {
      inputs: [
        { name: 'title', type: 'string', desc: 'Window title.' },
        { name: 'subtitle', type: 'string', desc: 'Window subtitle.' },
        { name: 'variant', type: "'default' | 'terminal' | 'system' | 'alert' | 'ghost'", default: "'default'", desc: 'Visual style.' },
        { name: 'padding', type: "'none' | 'sm' | 'md' | 'lg'", default: "'md'", desc: 'Internal padding.' },
        { name: 'status', type: 'WindowStatus | null', default: 'null', desc: 'Status indicator in titlebar.' },
        { name: 'statusLabel', type: 'string', default: "''", desc: 'Overrides auto status label.' },
        { name: 'controls', type: "WindowControl[]", desc: 'Array of window controls.' },
        { name: 'showControls', type: 'boolean', default: 'false', desc: 'Show default controls.' },
        { name: 'scrollable', type: 'boolean', default: 'false', desc: 'Enable internal scrolling.' },
        { name: 'maxHeight', type: 'number', default: '340', desc: 'Max-height (px) when scrollable.' },
        { name: 'loading', type: 'boolean', default: 'false', desc: 'Show loading overlay.' },
      ],
      outputs: [
        { name: 'closeClick', type: 'OutputRef<void>', desc: 'Close control clicked.' },
        { name: 'minimizeClick', type: 'OutputRef<void>', desc: 'Minimize control clicked.' },
        { name: 'maximizeClick', type: 'OutputRef<void>', desc: 'Maximize control clicked.' },
      ],
      slots: [
        { name: '(default)', desc: 'Main window content.' },
        { name: 'window-footer', desc: 'Footer bar content.' },
        { name: 'window-actions', desc: 'Custom header actions.' },
      ],
    },
    customization: [
      'Background uses --panel.',
      'Border uses --line.',
      'Shadow uses --shadow-md or --shadow-lg.',
    ],
    bestPractices: {
      do: [
        'Use as a base container for complex UI sections.',
        'Provide clear titles and subtitles.',
        'Use footer slot for metadata and actions.',
      ],
      dont: [
        'Do not nest windows more than one level deep.',
        'Do not use ghost variant for primary content containers.',
      ],
    },
    relatedTokens: ['--panel', '--line', '--shadow-md', '--shadow-lg'],
  },

  'retro-section': {
    id: 'retro-section',
    name: 'Section',
    selector: 'retro-section',
    description: 'Lightweight fieldset-style container with a label on the border for grouping content internally.',
    category: 'Container / Layout',
    badges: ['Standalone', 'OnPush', 'Composable'],
    importExample: `import { RetroSectionComponent } from '@retro-ui';`,
    basicUsage: {
      code: `<retro-section label="config / network">
  <p>Grouped content inside the retro fieldset.</p>
</retro-section>`,
    },
    examples: [
      {
        title: 'Terminal variant',
        code: `<retro-section label="logs" variant="terminal">
  <retro-code [code]="logs" language="bash" />
</retro-section>`,
      },
    ],
    variants: [
      { name: 'variant: default', description: 'Standard bordered section.' },
      { name: 'variant: terminal', description: 'Monospace terminal style.' },
      { name: 'variant: system', description: 'System style section.' },
      { name: 'variant: alert', description: 'Alert/danger style section.' },
      { name: 'variant: ghost', description: 'Subtle borderless section.' },
    ],
    states: [
      { name: 'Default', description: 'Resting section with border and label.' },
    ],
    accessibility: [
      'Label is associated via aria-labelledby when possible.',
      'Content is semantically grouped.',
    ],
    api: {
      inputs: [
        { name: 'label', type: 'string', default: "''", desc: 'Label displayed on the border.' },
        { name: 'variant', type: "'default' | 'terminal' | 'system' | 'alert' | 'ghost'", default: "'default'", desc: 'Visual style.' },
      ],
      outputs: [],
      slots: [
        { name: '(default)', desc: 'Section content.' },
      ],
    },
    customization: [
      'Border uses --line.',
      'Background uses --panel or --panel-alt.',
    ],
    bestPractices: {
      do: [
        'Use to group related form fields or content.',
        'Keep labels short and descriptive.',
      ],
      dont: [
        'Do not nest sections deeply.',
        'Do not use without a label.',
      ],
    },
    relatedTokens: ['--line', '--panel', '--panel-alt'],
  },

  collapsible: {
    id: 'collapsible',
    name: 'Collapsible',
    selector: 'retro-collapsible',
    description: 'Expandable block for progressive disclosure of documentation and content sections.',
    category: 'Container / Layout',
    badges: ['Standalone', 'OnPush', 'A11y'],
    importExample: `import { RetroCollapsibleComponent } from '@retro-ui';`,
    basicUsage: {
      code: `<retro-collapsible title="Advanced settings" [(collapsed)]="isCollapsed">
  <p>Hidden content revealed when expanded.</p>
</retro-collapsible>`,
    },
    examples: [
      {
        title: 'Disabled state',
        code: `<retro-collapsible title="Locked section" [disabled]="true" [collapsed]="true">
  <p>This content cannot be toggled.</p>
</retro-collapsible>`,
      },
    ],
    variants: [],
    states: [
      { name: 'Expanded', description: 'Content is visible.' },
      { name: 'Collapsed', description: 'Content is hidden.' },
      { name: 'Disabled', description: 'Toggle is not interactive.' },
    ],
    accessibility: [
      'Toggle button has aria-expanded.',
      'Content region has aria-labelledby linking to the toggle.',
      'Keyboard: Enter/Space toggles expansion.',
    ],
    api: {
      inputs: [
        { name: 'title', type: 'string', desc: 'Header title.', required: true },
        { name: 'collapsed', type: 'boolean', default: 'true', desc: 'Collapsed state.' },
        { name: 'disabled', type: 'boolean', default: 'false', desc: 'Disables toggle.' },
      ],
      outputs: [
        { name: 'collapsedChange', type: 'EventEmitter<boolean>', desc: 'Emitted when collapsed state changes.' },
      ],
      methods: [
        { name: 'toggle()', type: '() => void', desc: 'Toggles the collapsed state if not disabled.' },
      ],
      slots: [
        { name: '(default)', desc: 'Collapsible content.' },
      ],
    },
    customization: [
      'Header background uses --panel-alt.',
      'Border uses --line.',
    ],
    bestPractices: {
      do: [
        'Use for secondary or advanced options.',
        'Keep titles concise.',
        'Use disabled when content is unavailable.',
      ],
      dont: [
        'Do not hide critical content inside a collapsible.',
        'Do not nest collapsibles more than one level.',
      ],
    },
    relatedTokens: ['--panel-alt', '--line'],
  },

  'button-group': {
    id: 'button-group',
    name: 'Button Group',
    selector: 'retro-button-group',
    description: 'Semantic wrapper that groups adjacent buttons, removing duplicate internal borders.',
    category: 'Form / Action',
    badges: ['Standalone', 'OnPush', 'Composable'],
    importExample: `import { RetroButtonGroupComponent } from '@retro-ui';`,
    basicUsage: {
      code: `<retro-button-group>
  <retro-button variant="secondary" size="sm">edit</retro-button>
  <retro-button variant="secondary" size="sm">fork</retro-button>
  <retro-button variant="secondary" size="sm">archive</retro-button>
</retro-button-group>`,
    },
    examples: [
      {
        title: 'Mixed variants',
        code: `<retro-button-group>
  <retro-button variant="ghost" size="sm">← prev</retro-button>
  <retro-button variant="primary" size="sm">· 1 ·</retro-button>
  <retro-button variant="ghost" size="sm">next →</retro-button>
</retro-button-group>`,
      },
      {
        title: 'Danger zone',
        code: `<retro-button-group>
  <retro-button variant="secondary" tone="danger" size="sm">delete</retro-button>
  <retro-button variant="secondary" tone="danger" size="sm">purge</retro-button>
</retro-button-group>`,
      },
    ],
    variants: [],
    states: [
      { name: 'Default', description: 'Buttons grouped with merged borders.' },
    ],
    accessibility: [
      'Wraps buttons in a role="group" container.',
      'Individual button accessibility is preserved.',
    ],
    api: {
      inputs: [],
      outputs: [],
      slots: [
        { name: '(default)', desc: 'Button elements to group.' },
      ],
    },
    customization: [
      'Border merging uses --line.',
      'Gap removal is handled automatically.',
    ],
    bestPractices: {
      do: [
        'Use for related actions that appear together.',
        'Mix variants to highlight the primary action.',
      ],
      dont: [
        'Do not wrap unrelated buttons.',
        'Do not use as a layout grid replacement.',
      ],
    },
    relatedTokens: ['--line'],
  },

  kbd: {
    id: 'kbd',
    name: 'Kbd',
    selector: 'retro-kbd',
    description: 'Visual representation of single keys or keyboard shortcut combos.',
    category: 'Display',
    badges: ['Standalone', 'OnPush', 'A11y'],
    importExample: `import { RetroKbdComponent } from '@retro-ui';`,
    basicUsage: {
      code: `<retro-kbd>Ctrl</retro-kbd>`,
      description: 'Displays a single key in retro keyboard style.',
    },
    examples: [
      {
        title: 'Shortcut combo',
        description: 'Use keys input for multi-key shortcuts.',
        code: `<retro-kbd [keys]="['Ctrl', 'Shift', 'K']" />`,
      },
      {
        title: 'Single key',
        code: `<retro-kbd>Esc</retro-kbd>`,
      },
    ],
    variants: [],
    states: [
      { name: 'Default', description: 'Resting key cap style.' },
    ],
    accessibility: [
      'Rendered as <kbd> element for semantic meaning.',
      'Screen readers announce the key name.',
    ],
    api: {
      inputs: [
        { name: 'keys', type: 'string[]', desc: 'Array of keys for combo display.' },
      ],
      outputs: [],
      slots: [
        { name: '(default)', desc: 'Single key text.' },
      ],
    },
    customization: [
      'Background uses --sunken with inset shadow.',
      'Text uses --text.',
    ],
    bestPractices: {
      do: [
        'Use for documenting keyboard shortcuts.',
        'Use keys array for combos instead of manual spacing.',
      ],
      dont: [
        'Do not use as interactive buttons.',
        'Do not style with arbitrary colors.',
      ],
    },
    relatedTokens: ['--sunken', '--text'],
  },

  'toolbar-search': {
    id: 'toolbar-search',
    name: 'Toolbar Search',
    selector: 'retro-toolbar-search',
    description: 'Pre-configured search field for toolbars — wraps RetroInput with prefix and clearable.',
    category: 'Form / Control',
    badges: ['Standalone', 'OnPush', 'A11y'],
    importExample: `import { ToolbarSearchComponent } from '@retro-ui';`,
    basicUsage: {
      code: `<retro-toolbar-search
  [(ngModel)]="query"
  placeholder="Filter items..."
  (cleared)="query = ''"
/>`,
    },
    examples: [
      {
        title: 'With cleared handler',
        code: `<retro-toolbar-search
  [value]="searchValue"
  (valueChange)="searchValue = $event"
  (cleared)="onClear()"
/>`,
      },
    ],
    variants: [],
    states: [
      { name: 'Default', description: 'Resting search input.' },
      { name: 'Focus', description: 'Input is focused.' },
      { name: 'Has value', description: 'Clear button is visible.' },
    ],
    accessibility: [
      'Inherits accessibility from RetroInput.',
      'Clear button has aria-label.',
    ],
    api: {
      inputs: [
        { name: 'value', type: 'string', default: "''", desc: 'Current search value.' },
        { name: 'placeholder', type: 'string', default: "'Search...'", desc: 'Placeholder text.' },
      ],
      outputs: [
        { name: 'valueChange', type: 'EventEmitter<string>', desc: 'Emits on value change.' },
        { name: 'cleared', type: 'EventEmitter<void>', desc: 'Emitted when clear button is clicked.' },
      ],
    },
    customization: [
      'Uses --input-bg for background.',
      'Prefix and clearable are built-in.',
    ],
    bestPractices: {
      do: [
        'Use in toolbars and header areas.',
        'Handle cleared event for reset logic.',
      ],
      dont: [
        'Do not use as a general form input; prefer RetroInput.',
        'Do not disable clearable behavior.',
      ],
    },
    relatedTokens: ['--input-bg', '--line', '--focus-ring'],
  },

  stat: {
    id: 'stat',
    name: 'Stat Box',
    selector: 'retro-stat-box',
    description: 'Metric box for KPIs, counters, and dashboard summaries with trend indication.',
    category: 'Display',
    badges: ['Standalone', 'OnPush', 'A11y'],
    importExample: `import { StatBoxComponent } from '@retro-ui';`,
    basicUsage: {
      code: `<retro-stat-box label="Users" value="1,240" sublabel="+12% this week" />`,
    },
    examples: [
      {
        title: 'With trend',
        code: `<retro-stat-box label="Revenue" value="$48k" trend="up" tone="success" />`,
      },
      {
        title: 'Warning tone',
        code: `<retro-stat-box label="Errors" value="23" tone="warning" trend="down" />`,
      },
    ],
    variants: [
      { name: 'tone: default', description: 'Neutral metric.' },
      { name: 'tone: success', description: 'Positive metric.' },
      { name: 'tone: warning', description: 'Caution metric.' },
      { name: 'tone: danger', description: 'Critical metric.' },
      { name: 'trend: up', description: 'Positive change indicator.' },
      { name: 'trend: down', description: 'Negative change indicator.' },
    ],
    states: [
      { name: 'Default', description: 'Resting stat display.' },
    ],
    accessibility: [
      'Value is rendered as semantic text.',
      'Trend direction is communicated visually and via text.',
    ],
    api: {
      inputs: [
        { name: 'label', type: 'string', desc: 'Metric label.', required: true },
        { name: 'value', type: 'string', desc: 'Metric value.', required: true },
        { name: 'sublabel', type: 'string', desc: 'Secondary text below value.' },
        { name: 'tone', type: "StatBoxTone", default: "'default'", desc: 'Semantic tone.' },
        { name: 'trend', type: "StatBoxTrend", desc: 'Trend direction indicator.' },
      ],
      outputs: [],
    },
    customization: [
      'Tone colors map to semantic tokens.',
      'Background uses --panel or --panel-alt.',
    ],
    bestPractices: {
      do: [
        'Use for KPIs and summary metrics.',
        'Provide sublabel for context.',
        'Use tone to communicate metric health.',
      ],
      dont: [
        'Do not use for detailed data; use data-grid.',
        'Do not omit labels.',
      ],
    },
    relatedTokens: ['--panel', '--panel-alt', '--success', '--warning', '--danger'],
  },

  progress: {
    id: 'progress',
    name: 'Progress',
    selector: 'retro-progress',
    description: 'Progress bar with determinate and indeterminate modes, tone semantics, and optional label.',
    category: 'Feedback',
    badges: ['Standalone', 'OnPush', 'A11y'],
    importExample: `import { RetroProgressComponent } from '@retro-ui';`,
    basicUsage: {
      code: `<retro-progress [value]="64" label="Uploading..." />`,
    },
    examples: [
      {
        title: 'Indeterminate',
        code: `<retro-progress mode="indeterminate" label="Loading..." />`,
      },
      {
        title: 'With unit',
        code: `<retro-progress [value]="downloadProgress" unit="MB/s" [showValue]="true" />`,
      },
    ],
    variants: [
      { name: 'mode: determinate', description: 'Shows exact progress percentage.' },
      { name: 'mode: indeterminate', description: 'Animated indeterminate bar.' },
      { name: 'tone: default', description: 'Neutral progress.' },
      { name: 'tone: success', description: 'Positive progress.' },
      { name: 'tone: warning', description: 'Caution progress.' },
      { name: 'tone: danger', description: 'Critical progress.' },
    ],
    states: [
      { name: 'Default', description: 'Resting progress bar.' },
      { name: 'Animated', description: 'Striped animation in determinate mode.' },
      { name: 'Indeterminate', description: 'Continuous sliding animation.' },
      { name: 'Complete', description: 'Value reaches 100%.' },
    ],
    accessibility: [
      'Rendered with role="progressbar".',
      'aria-valuemin, aria-valuemax, and aria-valuenow set in determinate mode.',
      'Label is associated via aria-labelledby when provided.',
    ],
    api: {
      inputs: [
        { name: 'value', type: 'number', default: '0', desc: 'Current progress (0–100).' },
        { name: 'mode', type: "'determinate' | 'indeterminate'", default: "'determinate'", desc: 'Progress mode.' },
        { name: 'tone', type: "ProgressTone", default: "'default'", desc: 'Semantic tone.' },
        { name: 'unit', type: 'string', desc: 'Unit suffix displayed with value.' },
        { name: 'label', type: 'string', desc: 'Label text above the bar.' },
        { name: 'showValue', type: 'boolean', default: 'false', desc: 'Show numeric value.' },
        { name: 'animated', type: 'boolean', default: 'false', desc: 'Enable striped animation.' },
      ],
      outputs: [],
    },
    customization: [
      'Fill color uses tone-mapped semantic tokens.',
      'Track uses --sunken.',
    ],
    bestPractices: {
      do: [
        'Use determinate when progress is measurable.',
        'Use indeterminate when duration is unknown.',
        'Show value for user-facing operations.',
      ],
      dont: [
        'Do not use indeterminate for uploads with known size.',
        'Do not omit labels in complex UIs.',
      ],
    },
    relatedTokens: ['--sunken', '--accent', '--success', '--warning', '--danger'],
  },

  ascii: {
    id: 'ascii',
    name: 'Ascii Bar',
    selector: 'retro-ascii-bar',
    description: 'Terminal-style progress bar using configurable ASCII characters.',
    category: 'Display',
    badges: ['Standalone', 'OnPush', 'A11y'],
    importExample: `import { AsciiBarComponent } from '@retro-ui';`,
    basicUsage: {
      code: `<retro-ascii-bar [value]="72" />`,
    },
    examples: [
      {
        title: 'Custom characters',
        code: `<retro-ascii-bar [value]="45" filledChar="█" emptyChar="░" [width]="20" />`,
      },
      {
        title: 'With value label',
        code: `<retro-ascii-bar [value]="88" [showValue]="true" />`,
      },
    ],
    variants: [],
    states: [
      { name: 'Default', description: 'ASCII bar rendered with current value.' },
    ],
    accessibility: [
      'Rendered as preformatted text for screen reader compatibility.',
      'Value is announced as text content.',
    ],
    api: {
      inputs: [
        { name: 'value', type: 'number', default: '0', desc: 'Current value (0–100).' },
        { name: 'width', type: 'number', default: '20', desc: 'Bar width in characters.' },
        { name: 'filledChar', type: 'string', default: "'█'", desc: 'Character for filled portion.' },
        { name: 'emptyChar', type: 'string', default: "'-'", desc: 'Character for empty portion.' },
        { name: 'showValue', type: 'boolean', default: 'false', desc: 'Show percentage text.' },
      ],
      outputs: [],
    },
    customization: [
      'Characters are fully configurable.',
      'Text uses --text.',
    ],
    bestPractices: {
      do: [
        'Use in terminal or retro-themed interfaces.',
        'Keep width reasonable for the container.',
      ],
      dont: [
        'Do not use for precise accessibility needs; prefer Progress.',
        'Do not use multi-byte characters without testing alignment.',
      ],
    },
    relatedTokens: ['--text'],
  },

  code: {
    id: 'code',
    name: 'Code Block',
    selector: 'retro-code',
    description: 'Syntax-highlighted code block with language selector, optional frame, and copy action.',
    category: 'Display',
    badges: ['Standalone', 'OnPush', 'A11y'],
    importExample: `import { RetroCodeComponent } from '@retro-ui';`,
    basicUsage: {
      code: `<retro-code [code]="tsCode" language="typescript" />`,
    },
    examples: [
      {
        title: 'Framed block',
        code: `<retro-code [code]="example" language="angular" [framed]="true" />`,
      },
      {
        title: 'Inline snippet',
        code: `<retro-code code="npm install @retro-ui" language="bash" [framed]="false" />`,
      },
    ],
    variants: [
      { name: 'framed: true', description: 'Wrapped in a window-like frame.' },
      { name: 'framed: false', description: 'Inline code without frame.' },
    ],
    states: [
      { name: 'Default', description: 'Code displayed with syntax highlighting.' },
      { name: 'Copied', description: 'Copy feedback shown after click.' },
    ],
    accessibility: [
      'Code is selectable and readable by screen readers.',
      'Copy button has aria-label.',
    ],
    api: {
      inputs: [
        { name: 'code', type: 'string', desc: 'Code string to display.', required: true },
        { name: 'language', type: 'string', default: "''", desc: 'Syntax highlighting language.' },
        { name: 'framed', type: 'boolean', default: 'true', desc: 'Show window frame.' },
      ],
      outputs: [],
    },
    customization: [
      'Background uses --sunken.',
      'Text uses --text with monospace font.',
    ],
    bestPractices: {
      do: [
        'Use framed for multi-line examples.',
        'Use unframed for inline snippets.',
        'Specify language for correct highlighting.',
      ],
      dont: [
        'Do not use for user-generated content without sanitization.',
        'Do not omit language when highlighting is expected.',
      ],
    },
    relatedTokens: ['--sunken', '--text', '--font-mono'],
  },

  'api-table': {
    id: 'api-table',
    name: 'API Table',
    selector: 'retro-api-table',
    description: 'Reference table for API documentation — renders typed headers and projects rows via ng-content.',
    category: 'Display',
    badges: ['Standalone', 'OnPush', 'Composable'],
    importExample: `import { ApiTableComponent } from '@retro-ui';`,
    basicUsage: {
      code: `<retro-api-table type="input">
  <tr><td>name</td><td>string</td><td>required</td><td>field label</td></tr>
</retro-api-table>`,
    },
    examples: [
      {
        title: 'Output table with gap',
        code: `<retro-api-table type="output" [gap]="true">
  <tr><td>valueChange</td><td>string</td><td>emits on change</td></tr>
</retro-api-table>`,
      },
      {
        title: 'Method table',
        code: `<retro-api-table type="method">
  <tr><td>reset</td><td>() => void</td><td>restores initial value</td></tr>
</retro-api-table>`,
      },
    ],
    variants: [
      { name: 'type: input', description: 'Input property reference.' },
      { name: 'type: output', description: 'Output event reference.' },
      { name: 'type: method', description: 'Method reference.' },
    ],
    states: [
      { name: 'Default', description: 'Table rendered with typed header.' },
    ],
    accessibility: [
      'Uses semantic <table> structure.',
      'Header cells use <th> with scope.',
    ],
    api: {
      inputs: [
        { name: 'type', type: "'input' | 'output' | 'method'", default: "'input'", desc: 'Table header type.' },
        { name: 'gap', type: 'boolean', default: 'false', desc: 'Add spacing above table.' },
      ],
      outputs: [],
      slots: [
        { name: '(default)', desc: 'Table rows projected as <tr> elements.' },
      ],
    },
    customization: [
      'Border uses --line-soft.',
      'Header uses --panel-alt.',
    ],
    bestPractices: {
      do: [
        'Use for documenting component APIs.',
        'Project rows as standard <tr> elements.',
      ],
      dont: [
        'Do not use for data grids; use Data Grid.',
        'Do not project non-tr content.',
      ],
    },
    relatedTokens: ['--line-soft', '--panel-alt'],
  },

  skeleton: {
    id: 'skeleton',
    name: 'Skeleton',
    selector: 'retro-skeleton',
    description: 'Visual placeholder for loading states with wave, pulse, or static animations.',
    category: 'Feedback',
    badges: ['Standalone', 'OnPush', 'A11y'],
    importExample: `import { RetroSkeletonComponent } from '@retro-ui';`,
    basicUsage: {
      code: `<retro-skeleton width="240px" height="16px" />`,
    },
    examples: [
      {
        title: 'Multiple lines',
        code: `<retro-skeleton width="100%" height="14px" [count]="3" />`,
      },
      {
        title: 'Circle avatar',
        code: `<retro-skeleton width="40px" height="40px" shape="circle" animation="pulse" />`,
      },
    ],
    variants: [
      { name: 'shape: rectangle', description: 'Rounded rectangle (default).' },
      { name: 'shape: circle', description: 'Circular skeleton.' },
      { name: 'animation: wave', description: 'Shimmer wave effect.' },
      { name: 'animation: pulse', description: 'Opacity pulse effect.' },
      { name: 'animation: none', description: 'Static placeholder.' },
    ],
    states: [
      { name: 'Loading', description: 'Animated placeholder visible.' },
      { name: 'Static', description: 'Non-animated placeholder.' },
    ],
    accessibility: [
      'Has aria-busy="true" and aria-label="loading".',
      'Should be replaced by real content as soon as possible.',
    ],
    api: {
      inputs: [
        { name: 'width', type: 'string', default: "'100%'", desc: 'CSS width.' },
        { name: 'height', type: 'string', default: "'16px'", desc: 'CSS height.' },
        { name: 'shape', type: "'rectangle' | 'circle'", default: "'rectangle'", desc: 'Skeleton shape.' },
        { name: 'animation', type: "'wave' | 'pulse' | 'none'", default: "'wave'", desc: 'Animation type.' },
        { name: 'count', type: 'number', default: '1', desc: 'Number of repeated skeletons.' },
      ],
      outputs: [],
    },
    customization: [
      'Background uses --line-soft at low opacity.',
      'Wave highlight uses --panel-alt.',
    ],
    bestPractices: {
      do: [
        'Match skeleton dimensions to expected content.',
        'Use wave for general loading, pulse for subtle states.',
        'Reduce motion for users who prefer reduced motion.',
      ],
      dont: [
        'Do not use skeletons for empty states.',
        'Do not keep skeletons visible after load fails.',
      ],
    },
    relatedTokens: ['--line-soft', '--panel-alt'],
  },

  'notif-item': {
    id: 'notif-item',
    name: 'Notif Item',
    selector: 'retro-notif-item',
    description: 'Individual notification row with type badge, source, relative timestamp, and read state.',
    category: 'Feedback',
    badges: ['Standalone', 'OnPush', 'A11y'],
    importExample: `import { RetroNotifItemComponent } from '@retro-ui';`,
    basicUsage: {
      code: `<retro-notif-item
  type="event"
  source="webhook"
  [timestamp]="now"
  title="Build succeeded"
  subtitle="project-api · main"
/>`,
    },
    examples: [
      {
        title: 'Read state',
        code: `<retro-notif-item
  [read]="true"
  type="alert"
  title="Deployment failed"
  (itemRead)="markRead($event)"
/>`,
      },
    ],
    variants: [
      { name: 'type: event', description: 'General event notification.' },
      { name: 'type: build', description: 'CI/build notification.' },
      { name: 'type: alert', description: 'Alert notification.' },
    ],
    states: [
      { name: 'Unread', description: 'Highlighted with accent indicator.' },
      { name: 'Read', description: 'Muted styling.' },
    ],
    accessibility: [
      'Read state communicated via aria-pressed or visual indicator.',
      'Timestamp has aria-label with full date.',
    ],
    api: {
      inputs: [
        { name: 'type', type: "NotifType", desc: 'Notification type.', required: true },
        { name: 'source', type: "NotifSource", desc: 'Notification source.', required: true },
        { name: 'timestamp', type: 'Date | number', desc: 'Event timestamp.', required: true },
        { name: 'title', type: 'string', desc: 'Notification title.', required: true },
        { name: 'subtitle', type: 'string', desc: 'Secondary text.' },
        { name: 'read', type: 'boolean', default: 'false', desc: 'Read state.' },
      ],
      outputs: [
        { name: 'itemRead', type: 'EventEmitter<void>', desc: 'Emitted when marked as read.' },
      ],
    },
    customization: [
      'Type colors map to semantic tokens.',
      'Unread indicator uses --accent.',
    ],
    bestPractices: {
      do: [
        'Use inside NotifStream for panels.',
        'Provide clear titles and subtitles.',
        'Handle itemRead for state management.',
      ],
      dont: [
        'Do not use as standalone alerts; use Message.',
        'Do not omit timestamps in streams.',
      ],
    },
    relatedTokens: ['--accent', '--muted', '--text'],
  },

  'notif-stream': {
    id: 'notif-stream',
    name: 'Notif Stream',
    selector: 'retro-notif-stream',
    description: 'Side panel notification stream with slide-in animation, batch actions, and NotifItem projection.',
    category: 'Feedback',
    badges: ['Standalone', 'OnPush', 'A11y', 'Composable'],
    importExample: `import { RetroNotifStreamComponent } from '@retro-ui';`,
    basicUsage: {
      code: `<retro-notif-stream [open]="open()" (closed)="open.set(false)">
  @for (item of items; track item.id) {
    <retro-notif-item [type]="item.type" [title]="item.title" />
  }
</retro-notif-stream>`,
    },
    examples: [
      {
        title: 'With NotifService',
        code: `<retro-notif-stream [open]="true">
  @for (item of notifService.items(); track item.id) {
    <retro-notif-item
      [type]="item.type"
      [source]="item.source"
      [timestamp]="item.timestamp"
      [title]="item.title"
      [subtitle]="item.subtitle"
      [read]="item.read"
      (itemRead)="notifService.markRead(item.id)"
    />
  }
</retro-notif-stream>`,
      },
    ],
    variants: [],
    states: [
      { name: 'Closed', description: 'Panel is hidden.' },
      { name: 'Open', description: 'Panel slides in.' },
    ],
    accessibility: [
      'Panel has role="complementary" and aria-label.',
      'Focus is managed when panel opens.',
      'Close button has accessible label.',
    ],
    api: {
      inputs: [
        { name: 'open', type: 'boolean', default: 'false', desc: 'Panel visibility.' },
      ],
      outputs: [
        { name: 'closed', type: 'EventEmitter<void>', desc: 'Emitted when panel closes.' },
      ],
      slots: [
        { name: '(default)', desc: 'Notification items projected here.' },
      ],
    },
    customization: [
      'Panel background uses --panel.',
      'Shadow uses --shadow-lg.',
    ],
    bestPractices: {
      do: [
        'Use for notification centers and activity feeds.',
        'Project NotifItem components for consistency.',
      ],
      dont: [
        'Do not use as a modal replacement.',
        'Do not project non-notification content.',
      ],
    },
    relatedTokens: ['--panel', '--shadow-lg'],
  },

  pill: {
    id: 'pill',
    name: 'Status Pill',
    selector: 'retro-status-pill',
    description: 'Compact pill for workflow states and categorical status display.',
    category: 'Label',
    badges: ['Standalone', 'OnPush', 'A11y'],
    importExample: `import { StatusPillComponent } from '@retro-ui';`,
    basicUsage: {
      code: `<retro-status-pill status="active" />`,
    },
    examples: [
      {
        title: 'Small size',
        code: `<retro-status-pill status="review" size="sm" />`,
      },
      {
        title: 'All statuses',
        code: `<div style="display:flex;gap:8px">
  <retro-status-pill status="todo" />
  <retro-status-pill status="doing" />
  <retro-status-pill status="review" />
  <retro-status-pill status="done" />
</div>`,
      },
    ],
    variants: [
      { name: 'status: todo', description: 'Pending work.' },
      { name: 'status: doing', description: 'In progress.' },
      { name: 'status: review', description: 'Under review.' },
      { name: 'status: done', description: 'Completed.' },
      { name: 'size: sm', description: 'Compact pill.' },
      { name: 'size: md', description: 'Default pill.' },
    ],
    states: [
      { name: 'Default', description: 'Resting pill with status color.' },
    ],
    accessibility: [
      'Status text is readable by screen readers.',
      'Color is accompanied by text label.',
    ],
    api: {
      inputs: [
        { name: 'status', type: "StatusPillStatus", desc: 'Workflow status.', required: true },
        { name: 'size', type: "StatusPillSize", default: "'md'", desc: 'Pill size.' },
      ],
      outputs: [],
    },
    customization: [
      'Status colors map to semantic tokens.',
      'Background uses status color at low opacity.',
    ],
    bestPractices: {
      do: [
        'Use for workflow states in tables and cards.',
        'Keep pills horizontally aligned with text.',
      ],
      dont: [
        'Do not use for boolean states; use StatusDot.',
        'Do not create custom status strings.',
      ],
    },
    relatedTokens: ['--accent', '--success', '--warning', '--info'],
  },

  dot: {
    id: 'dot',
    name: 'Status Dot',
    selector: 'retro-status-dot',
    description: 'Minimal status indicator with optional pulse animation for activity.',
    category: 'Label',
    badges: ['Standalone', 'OnPush', 'A11y'],
    importExample: `import { StatusDotComponent } from '@retro-ui';`,
    basicUsage: {
      code: `<retro-status-dot status="active" />`,
    },
    examples: [
      {
        title: 'Pulsing dot',
        code: `<retro-status-dot status="active" [pulse]="true" />`,
      },
      {
        title: 'All statuses',
        code: `<div style="display:flex;gap:12px;align-items:center">
  <retro-status-dot status="online" />
  <retro-status-dot status="away" />
  <retro-status-dot status="busy" />
  <retro-status-dot status="offline" />
</div>`,
      },
    ],
    variants: [
      { name: 'status: online', description: 'Available.' },
      { name: 'status: away', description: 'Away.' },
      { name: 'status: busy', description: 'Busy.' },
      { name: 'status: offline', description: 'Offline.' },
      { name: 'size: sm', description: 'Small dot.' },
      { name: 'size: md', description: 'Default dot.' },
      { name: 'size: lg', description: 'Large dot.' },
    ],
    states: [
      { name: 'Default', description: 'Static dot.' },
      { name: 'Pulsing', description: 'Animated pulse effect.' },
    ],
    accessibility: [
      'Status is communicated via aria-label.',
      'Pulse animation respects prefers-reduced-motion.',
    ],
    api: {
      inputs: [
        { name: 'status', type: "StatusDotStatus", desc: 'Status value.', required: true },
        { name: 'size', type: "'xs' | 'sm' | 'md'", default: "'sm'", desc: 'Dot size.' },
        { name: 'pulse', type: 'boolean', default: 'false', desc: 'Enable pulse animation.' },
      ],
      outputs: [],
    },
    customization: [
      'Dot color maps to semantic tokens.',
      'Pulse uses box-shadow animation.',
    ],
    bestPractices: {
      do: [
        'Use for presence and simple state indicators.',
        'Use pulse sparingly for active processes.',
      ],
      dont: [
        'Do not use without a text label nearby.',
        'Do not pulse multiple dots simultaneously.',
      ],
    },
    relatedTokens: ['--success', '--warning', '--danger', '--muted'],
  },

  tag: {
    id: 'tag',
    name: 'Tag',
    selector: 'retro-tag',
    description: 'Textual tag for labels, filters, and taxonomy with optional removal.',
    category: 'Label',
    badges: ['Standalone', 'OnPush', 'A11y'],
    importExample: `import { RetroTagComponent } from '@retro-ui';`,
    basicUsage: {
      code: `<retro-tag label="frontend" />`,
    },
    examples: [
      {
        title: 'Removable tag',
        code: `<retro-tag label="urgent" [removable]="true" (removed)="removeTag('urgent')" />`,
      },
      {
        title: 'With icon',
        code: `<retro-tag label="starred" icon="★" variant="primary" />`,
      },
    ],
    variants: [
      { name: 'variant: default', description: 'Neutral tag.' },
      { name: 'variant: primary', description: 'Accent tag.' },
      { name: 'variant: secondary', description: 'Muted tag.' },
      { name: 'size: sm', description: 'Compact tag.' },
      { name: 'size: md', description: 'Default tag.' },
    ],
    states: [
      { name: 'Default', description: 'Resting tag.' },
      { name: 'Removable', description: 'Shows remove button on hover.' },
      { name: 'Disabled', description: 'Non-interactive, reduced opacity.' },
    ],
    accessibility: [
      'Remove button has aria-label.',
      'Tag text is readable by screen readers.',
    ],
    api: {
      inputs: [
        { name: 'label', type: 'string', desc: 'Tag text.', required: true },
        { name: 'icon', type: 'string', desc: 'Icon glyph.' },
        { name: 'variant', type: "'default' | 'primary' | 'success' | 'warning' | 'danger'", default: "'default'", desc: 'Visual variant.' },
        { name: 'size', type: "TagSize", default: "'md'", desc: 'Tag size.' },
        { name: 'removable', type: 'boolean', default: 'false', desc: 'Show remove button.' },
        { name: 'disabled', type: 'boolean', default: 'false', desc: 'Disable interaction.' },
      ],
      outputs: [
        { name: 'removed', type: 'EventEmitter<void>', desc: 'Emitted when remove is clicked.' },
      ],
    },
    customization: [
      'Variant colors map to semantic tokens.',
      'Border uses --line-soft.',
    ],
    bestPractices: {
      do: [
        'Use for categories, labels, and filters.',
        'Handle removed event for filter removal.',
      ],
      dont: [
        'Do not use for primary actions; use Button.',
        'Do not nest interactive elements inside tags.',
      ],
    },
    relatedTokens: ['--accent', '--line-soft', '--text'],
  },

  'priority-indicator': {
    id: 'priority-indicator',
    name: 'Priority Indicator',
    selector: 'retro-priority-indicator',
    description: 'Terminal-style priority indicator using symbols (!!, !, •, ·, —) by level.',
    category: 'Label',
    badges: ['Standalone', 'OnPush', 'A11y'],
    importExample: `import { PriorityIndicatorComponent } from '@retro-ui';`,
    basicUsage: {
      code: `<retro-priority-indicator priority="high" />`,
    },
    examples: [
      {
        title: 'All levels',
        code: `<div style="display:flex;gap:12px">
  <retro-priority-indicator priority="critical" />
  <retro-priority-indicator priority="high" />
  <retro-priority-indicator priority="medium" />
  <retro-priority-indicator priority="low" />
  <retro-priority-indicator priority="none" />
</div>`,
      },
    ],
    variants: [],
    states: [
      { name: 'Default', description: 'Symbol rendered with priority color.' },
    ],
    accessibility: [
      'Priority level is communicated via aria-label.',
      'Symbol is accompanied by semantic text when possible.',
    ],
    api: {
      inputs: [
        { name: 'priority', type: "Priority", default: "'none'", desc: 'Priority level.' },
      ],
      outputs: [],
    },
    customization: [
      'Critical uses --danger.',
      'High uses --warning.',
      'Medium uses --accent.',
      'Low uses --muted.',
    ],
    bestPractices: {
      do: [
        'Use in data grids and task lists.',
        'Pair with text label for clarity.',
      ],
      dont: [
        'Do not use as the only priority indicator in accessible contexts.',
        'Do not invent custom priority levels.',
      ],
    },
    relatedTokens: ['--danger', '--warning', '--accent', '--muted'],
  },

  'visibility-chip': {
    id: 'visibility-chip',
    name: 'Visibility Chip',
    selector: 'retro-visibility-chip',
    description: 'Semantic visibility chip [PUB]/[PRIV]/[INT] with color by type.',
    category: 'Label',
    badges: ['Standalone', 'OnPush', 'A11y'],
    importExample: `import { VisibilityChipComponent } from '@retro-ui';`,
    basicUsage: {
      code: `<retro-visibility-chip visibility="public" />`,
    },
    examples: [
      {
        title: 'All types',
        code: `<div style="display:flex;gap:12px">
  <retro-visibility-chip visibility="public" />
  <retro-visibility-chip visibility="private" />
  <retro-visibility-chip visibility="internal" />
</div>`,
      },
    ],
    variants: [],
    states: [
      { name: 'Default', description: 'Chip rendered with type color.' },
    ],
    accessibility: [
      'Visibility type is communicated via aria-label.',
      'Abbreviation is expanded for screen readers.',
    ],
    api: {
      inputs: [
        { name: 'visibility', type: "Visibility", default: "'public'", desc: 'Visibility type.' },
      ],
      outputs: [],
    },
    customization: [
      'Public uses --success.',
      'Private uses --danger.',
      'Internal uses --warning.',
    ],
    bestPractices: {
      do: [
        'Use for repository and document visibility.',
        'Place near the item name for context.',
      ],
      dont: [
        'Do not use for access control actions; use Button.',
        'Do not mix with unrelated tag components.',
      ],
    },
    relatedTokens: ['--success', '--danger', '--warning'],
  },

  'retro-filter-bar': {
    id: 'retro-filter-bar',
    name: 'Filter Bar',
    selector: 'retro-filter-bar',
    description: 'Generic filter bar with single/multi-select tabs, disabled tabs, and a right slot for extra controls.',
    category: 'Data / Display',
    badges: ['Standalone', 'OnPush', 'A11y', 'Composable'],
    importExample: `import { RetroFilterBarComponent } from '@retro-ui';`,
    basicUsage: {
      code: `<retro-filter-bar
  [tabs]="filterTabs"
  [active]="activeFilter"
  (tabChange)="activeFilter = $event"
/>`,
    },
    examples: [
      {
        title: 'Multi-select',
        code: `<retro-filter-bar
  [tabs]="filterTabs"
  [multiSelect]="true"
  [activeKeys]="selectedFilters"
  (keysChange)="selectedFilters = $event"
/>`,
      },
      {
        title: 'With right slot',
        code: `<retro-filter-bar [tabs]="tabs" [active]="key" (tabChange)="key = $event">
  <span filter-end>{{ activeCount }} results</span>
</retro-filter-bar>`,
      },
    ],
    variants: [
      { name: 'single', description: 'One active tab at a time.' },
      { name: 'multi', description: 'Multiple tabs can be active.' },
    ],
    states: [
      { name: 'Default', description: 'Resting tab bar.' },
      { name: 'Active', description: 'One or more tabs selected.' },
      { name: 'Disabled tab', description: 'Tab is not interactive.' },
    ],
    accessibility: [
      'Tabs use role="tablist" with role="tab" items.',
      'Disabled tabs have aria-disabled.',
      'Selection is communicated via aria-selected.',
    ],
    api: {
      inputs: [
        { name: 'tabs', type: 'FilterTab[]', default: '[]', desc: 'Tab definitions.' },
        { name: 'active', type: 'string', desc: 'Currently active tab key (single mode).' },
        { name: 'multiSelect', type: 'boolean', default: 'false', desc: 'Enable multi-select.' },
        { name: 'activeKeys', type: 'string[]', desc: 'Active keys (multi mode).' },
      ],
      outputs: [
        { name: 'tabChange', type: 'EventEmitter<string>', desc: 'Emitted when single tab changes.' },
        { name: 'keysChange', type: 'EventEmitter<string[]>', desc: 'Emitted when multi selection changes.' },
      ],
      slots: [
        { name: 'filter-end', desc: 'Right-side content slot.' },
      ],
    },
    customization: [
      'Active tab uses --accent background.',
      'Border uses --line.',
    ],
    bestPractices: {
      do: [
        'Use for filtering lists and grids.',
        'Provide counts or context in filter-end slot.',
      ],
      dont: [
        'Do not use as primary navigation.',
        'Do not mix single and multi modes dynamically.',
      ],
    },
    relatedTokens: ['--accent', '--line', '--panel-alt'],
  },

  'retro-grid-row': {
    id: 'retro-grid-row',
    name: 'Grid Row',
    selector: 'retro-grid-row',
    description: 'Generic grid row that projects any child as a cell and inherits --grid-cols from the parent data grid.',
    category: 'Data / Display',
    badges: ['Standalone', 'OnPush', 'Composable'],
    importExample: `import { RetroGridRowComponent } from '@retro-ui';`,
    basicUsage: {
      code: `<retro-grid-row>
  <span>#1</span>
  <span>alice</span>
  <span>admin</span>
</retro-grid-row>`,
    },
    examples: [
      {
        title: 'Inside data grid',
        code: `<retro-data-grid [columns]="cols" [rowCount]="3">
  <retro-grid-row><span>A</span><span>B</span><span>C</span></retro-grid-row>
</retro-data-grid>`,
      },
    ],
    variants: [],
    states: [
      { name: 'Default', description: 'Row rendered with grid columns.' },
      { name: 'Hover', description: 'Row highlight on hover.' },
    ],
    accessibility: [
      'Cells are semantic HTML projected by the consumer.',
      'Parent data grid handles table semantics when applicable.',
    ],
    api: {
      inputs: [
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", desc: 'Row size.' },
      ],
      outputs: [],
      slots: [
        { name: '(default)', desc: 'Cell content projected as children.' },
      ],
    },
    customization: [
      'Grid columns controlled by parent --grid-cols.',
      'Borders use --line-soft.',
    ],
    bestPractices: {
      do: [
        'Use inside Data Grid for consistent layouts.',
        'Match child count to column definitions.',
      ],
      dont: [
        'Do not use as a standalone layout component.',
        'Do not nest interactive elements without care.',
      ],
    },
    relatedTokens: ['--line-soft', '--grid-cols'],
  },

  'retro-expandable-row': {
    id: 'retro-expandable-row',
    name: 'Expandable Row',
    selector: 'retro-expandable-row',
    description: 'Expandable grid row with animated detail panel — inherits --grid-cols and uses model(expanded).',
    category: 'Data / Display',
    badges: ['Standalone', 'OnPush', 'A11y', 'Composable'],
    importExample: `import { RetroExpandableRowComponent } from '@retro-ui';`,
    basicUsage: {
      code: `<retro-expandable-row [(expanded)]="isExpanded">
  <button (click)="isExpanded = !isExpanded">▶/▼</button>
  <span>alice</span>
  <span>admin</span>
  <div detail>
    <strong>Email:</strong> alice&#64;devboard.io
  </div>
</retro-expandable-row>`,
    },
    examples: [
      {
        title: 'Expand on row click',
        code: `<retro-expandable-row [expandOnClick]="true" [(expanded)]="expanded">
  <span>Row content</span>
  <div detail>Expanded details here</div>
</retro-expandable-row>`,
      },
    ],
    variants: [],
    states: [
      { name: 'Collapsed', description: 'Detail panel is hidden.' },
      { name: 'Expanded', description: 'Detail panel is visible.' },
    ],
    accessibility: [
      'Toggle button has aria-expanded.',
      'Detail region is associated via aria-controls.',
    ],
    api: {
      inputs: [
        { name: 'expanded', type: 'boolean', default: 'false', desc: 'Expanded state.' },
        { name: 'expandOnClick', type: 'boolean', default: 'false', desc: 'Expand on any row click.' },
      ],
      outputs: [
        { name: 'expandedChange', type: 'EventEmitter<boolean>', desc: 'Emitted when expanded state changes.' },
      ],
      methods: [
        { name: 'toggle()', type: '() => void', desc: 'Toggles the expanded state.' },
      ],
      slots: [
        { name: '(default)', desc: 'Row cell content.' },
        { name: 'detail', desc: 'Expanded detail panel content.' },
      ],
    },
    customization: [
      'Detail panel background uses --panel-alt.',
      'Border uses --line-soft.',
    ],
    bestPractices: {
      do: [
        'Use for detail views in data grids.',
        'Provide a visible toggle control.',
      ],
      dont: [
        'Do not nest expandable rows inside expandable rows.',
        'Do not use expandOnClick when cells contain interactive elements.',
      ],
    },
    relatedTokens: ['--panel-alt', '--line-soft'],
  },

  'retro-paginator': {
    id: 'retro-paginator',
    name: 'Paginator',
    selector: 'retro-paginator',
    description: 'Pagination bar with page navigation, smart number window, and page size selector.',
    category: 'Data / Display',
    badges: ['Standalone', 'OnPush', 'A11y'],
    importExample: `import { RetroPaginatorComponent } from '@retro-ui';`,
    basicUsage: {
      code: `<retro-paginator
  [page]="page"
  [pageSize]="pageSize"
  [total]="total"
  (pageChange)="page = $event"
  (pageSizeChange)="pageSize = $event"
/>`,
    },
    examples: [
      {
        title: 'With page size options',
        code: `<retro-paginator
  [page]="page"
  [pageSize]="pageSize"
  [total]="total"
  [pageSizeOptions]="[5, 10, 25, 50]"
  (pageChange)="page = $event"
  (pageSizeChange)="pageSize = $event"
/>`,
      },
    ],
    variants: [],
    states: [
      { name: 'Default', description: 'Pagination controls visible.' },
      { name: 'Disabled', description: 'Navigation disabled when only one page.' },
    ],
    accessibility: [
      'Page buttons have aria-label with page number.',
      'Current page has aria-current="page".',
      'Keyboard navigation supported.',
    ],
    api: {
      inputs: [
        { name: 'page', type: 'number', default: '0', desc: 'Current page index.' },
        { name: 'pageSize', type: 'number', default: '10', desc: 'Items per page.' },
        { name: 'total', type: 'number', default: '0', desc: 'Total item count.' },
        { name: 'pageSizeOptions', type: 'number[]', desc: 'Available page sizes.' },
        { name: 'showPageSize', type: 'boolean', default: 'true', desc: 'Show page size selector.' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", desc: 'Paginator size.' },
      ],
      outputs: [
        { name: 'pageChange', type: 'EventEmitter<number>', desc: 'Emitted when page changes.' },
        { name: 'pageSizeChange', type: 'EventEmitter<number>', desc: 'Emitted when page size changes.' },
      ],
    },
    customization: [
      'Background uses --panel.',
      'Active page uses --accent.',
      'Border uses --line.',
    ],
    bestPractices: {
      do: [
        'Use with Data Grid for large datasets.',
        'Reset to page 0 when page size changes.',
      ],
      dont: [
        'Do not use for infinite scroll lists.',
        'Do not hide when there is only one page.',
      ],
    },
    relatedTokens: ['--panel', '--accent', '--line'],
  },

  'retro-status-bar': {
    id: 'retro-status-bar',
    name: 'Status Bar',
    selector: 'retro-status-bar',
    description: 'Fixed status bar with version, system items, and keyboard shortcuts.',
    category: 'Shell',
    badges: ['Standalone', 'OnPush', 'A11y'],
    importExample: `import { RetroStatusBarComponent } from '@retro-ui';`,
    basicUsage: {
      code: `<retro-status-bar
  version="0.3.1"
  [items]="statusItems"
  [shortcuts]="shortcuts"
/>`,
    },
    examples: [
      {
        title: 'With system items',
        code: `const items: StatusItem[] = [
  { label: 'DB', value: 'connected' },
  { label: 'API', value: 'degraded' },
];

<retro-status-bar version="1.0.0" [items]="items" />`,
      },
    ],
    variants: [],
    states: [
      { name: 'Default', description: 'Status bar with all items.' },
    ],
    accessibility: [
      'Status items are readable by screen readers.',
      'Shortcuts are documented with kbd elements.',
    ],
    api: {
      inputs: [
        { name: 'version', type: 'string', desc: 'Application version.' },
        { name: 'items', type: 'StatusItem[]', desc: 'System status items.' },
        { name: 'shortcuts', type: 'StatusShortcut[]', desc: 'Keyboard shortcuts to display.' },
      ],
      outputs: [],
    },
    customization: [
      'Background uses --panel.',
      'Border uses --line.',
      'Tone colors map to semantic tokens.',
    ],
    bestPractices: {
      do: [
        'Use at the bottom of the application shell.',
        'Keep items concise and scannable.',
      ],
      dont: [
        'Do not use for primary navigation.',
        'Do not overload with too many items.',
      ],
    },
    relatedTokens: ['--panel', '--line', '--success', '--warning', '--danger'],
  },
};
