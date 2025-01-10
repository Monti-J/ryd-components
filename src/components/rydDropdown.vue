<template>
    <div class="dropdown" :class="{ disabled }">
        <button
            class="dropdown-toggle"
            :style="[buttonStyle, { width: computedWidth }]"
            :disabled="disabled"
            @click="toggleDropdown"
        >
            <slot name="text">{{ text || selectedLabel }}</slot>
            <span class="arrow">▼</span>
        </button>
        <ul
            v-if="isOpen"
            class="dropdown-menu"
            :style="{
                borderColor:
                props.backgroundColor ? props.backgroundColor : '#ccc',
                backgroundColor: dropdownBackgroundColor 
            }"
        >
            <li
                v-if="multiselect"
                class="dropdown-item"
                @click="toggleSelectAll"
                :style="{ color: props.color || 'black' }"
            >
                <input
                    type="checkbox"
                    :checked="isAllSelected"
                />
                Seleccionar todos
            </li>
            <li
                v-for="option in props.options"
                :key="option.value"
                class="dropdown-item"
                @click="selectOption(option)"
                :style="{ color: props.color || 'black' }"
            >
                <input
                    v-if="multiselect"
                    type="checkbox"
                    :checked="isOptionSelected(option.value)"
                />
                {{ option.label }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

interface Option {
    label: string;
    value: string | number;
}

const props = defineProps({
    options: {
        type: Array as () => Option[],
        required: true,
    },
    modelValue: {
        type: [Array, String, Number, Object],
        required: false,
    },
    backgroundColor: {
        type: String,
        required: false,
    },
    color: {
        type: String,
        required: false,
    },
    size: {
        type: String as () => 'sm' | 'md' | 'lg',
        default: 'md',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    text: {
        type: String,
        required: false,
        default: '',
    },
    width: {
        type: [String, Number],
        required: false,
        default: 'auto',
    },
    multiselect: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const selectedLabel = ref('');
const selectedValues = ref<(string | number)[]>([]);

const toggleDropdown = () => {
    if (!props.disabled) isOpen.value = !isOpen.value;
};

const selectOption = (option: Option) => {
    if (props.multiselect) {
        toggleOption(option);
    } else {
        emit('update:modelValue', option.value);
        isOpen.value = false;
    }
};

const toggleOption = (option: Option) => {
    const index = selectedValues.value.indexOf(option.value);
    if (index === -1) {
        selectedValues.value.push(option.value);
    } else {
        selectedValues.value.splice(index, 1);
    }
    emit('update:modelValue', [...selectedValues.value]);
};

const toggleSelectAll = () => {
    if (selectedValues.value.length === props.options.length) {
        selectedValues.value = [];
    } else {
        selectedValues.value = props.options.map(option => option.value);
    }
    emit('update:modelValue', [...selectedValues.value]);
};

const isOptionSelected = (value: string | number) => {
    return selectedValues.value.includes(value);
};

const isAllSelected = computed(() => {
    return props.options.length === selectedValues.value.length;
});

watch(
    () => props.modelValue,
    (newValue) => {
        if (Array.isArray(newValue)) {
            selectedValues.value = newValue.filter(
                (value) => typeof value === 'string' || typeof value === 'number'
            ) as (string | number)[];
        } else {
            selectedValues.value = [];
        }
    },
    { immediate: true }
);

watch(
    () => props.options,
    () => {
        if (props.multiselect) {
            selectedValues.value = [];
        }
    }
);

const buttonStyle = computed(() => {
    const sizes = {
        sm: '8px 12px',
        md: '10px 16px',
        lg: '12px 20px',
    };
    const baseStyle = {
        backgroundColor: props.backgroundColor,
        color: props.color || 'black',
        padding: sizes[props.size],
        cursor: props.disabled ? 'not-allowed' : 'pointer',
    };
    if (props.disabled) {
        baseStyle.backgroundColor = '#e0e0e0';
        baseStyle.color = '#a0a0a0';
    }
    return baseStyle;
});

const dropdownBackgroundColor = computed(() => {
    return props.backgroundColor || '#f9f9f9';
});

const computedWidth = computed(() => {
    if (typeof props.width === 'number') {
        return `${props.width}px`;
    } else if (props.width === 'fixed') {
        return '100%';
    } else {
        return 'auto';
    }
});
</script>

<style scoped>
.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-toggle {
    cursor: pointer;
    padding: 10px;
    border: 1px solid #ccc;
    background-color: transparent;
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.arrow {
    font-size: 12px;
    margin-left: 5px;
}

.dropdown-menu {
    list-style: none;
    padding: 0;
    margin: 0;
    position: absolute;
    top: 100%;
    left: 0;
    width: auto;
    min-width: 100%;
    border: 1px solid #ccc;
    z-index: 1000;
}

.dropdown-item {
    padding: 10px;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.dropdown-item:hover {
    background-color: #f1f1f1;
}

input[type="checkbox"] {
    margin-right: 8px;
}
</style>
