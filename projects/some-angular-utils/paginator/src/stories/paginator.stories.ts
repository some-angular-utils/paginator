import type { Meta, StoryObj } from '@storybook/angular';
import { useArgs } from '@storybook/preview-api'; // Hook para manejar el estado
import { SAUPaginatorModule } from '../public-api';

const meta: Meta = {
    title: 'Components/Paginator',
    component: SAUPaginatorModule,
};

export default meta;
type Story = StoryObj;

export const Interactive: Story = {
    args: {
        currentPage: 1,
        totalPages: 10,
    },
    render: (args) => {
        // 1. Usamos useArgs para capturar el estado actual y la función para actualizarlo
        const [{ currentPage }, updateArgs] = useArgs();

        return {
            props: {
                ...args,
                currentPage, // Pasamos el valor actual del estado de Storybook
                pageChange: (event: any) => {
                    // 2. Aquí sumamos uno al valor actual
                    updateArgs({ currentPage: currentPage + 1 });

                    // Opcional: Ejecutar la acción original para verla en el panel de Actions
                    if (args['pageChange']) args['pageChange'](event);
                },
            },
        };
    },
};